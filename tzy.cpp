#include <iostream>
#include <vector>
using namespace std;
typedef struct Node* node;
const double alpha = 0.7;
const double beta = 0.40;
struct Node {
  int x;
  node left;
  node right;
  node dad;
  int size;
  int realsize;
  bool alive;
  int cnt;
  int totalcnt;
  Node(int x, node dad)
      : x(x),
        left(0),
        right(0),
        dad(dad),
        size(1),
        realsize(1),
        totalcnt(1),
        alive(1),
        cnt(1){};
};

node find(int x, node now) {
  if (x < now->x && now->left) return find(x, now->left);
  if (x > now->x && now->right) return find(x, now->right);
  return now;
}
void print(node cur) {
  if (!cur) return;
  print(cur->left);
  for (int i = 0; i < cur->cnt; i++) cout << cur->x << " ";
  cout << endl;
  print(cur->right);
}
node root;
void update(node now, int real, int size, int cnt) {
  if (!now) return;
  now->realsize += real;
  now->size += size;
  now->totalcnt += cnt;
  update(now->dad, real, size, cnt);
}

void update(node cur, bool rec) {
  if (!cur) return;
  cur->totalcnt = cur->cnt;
  cur->size = 1;
  cur->realsize = 1;
  if (cur->left) {
    cur->totalcnt += cur->left->totalcnt;
    cur->size += cur->left->size;
    cur->realsize += cur->left->realsize;
  }
  if (cur->right) {
    cur->totalcnt += cur->right->totalcnt;
    cur->size += cur->right->size;
    cur->realsize += cur->right->realsize;
  }
  if (rec) update(cur->dad, rec);
}

void dfs_rebuild(node cur, vector<pair<int, int>>& arr) {
  if (cur == 0) return;
  dfs_rebuild(cur->left, arr);
  if (cur->alive) arr.push_back({cur->x, cur->cnt});
  dfs_rebuild(cur->right, arr);
  delete cur;
}

node regeneTree(int l, int r, node dad, const vector<pair<int, int>>& arr) {
  if (l >= r) return 0;
  int mid = (l + r) >> 1;
  node cur = new Node(arr[mid].first, dad);
  cur->cnt = arr[mid].second;
  cur->left = regeneTree(l, mid, cur, arr);
  cur->right = regeneTree(mid + 1, r, cur, arr);
  update(cur, false);
  return cur;
}

void rebuild(node x) {
  int dir;
  if (x == root)
    dir = 1;
  else if (x->dad->left == x)
    dir = 2;
  else
    dir = 3;
  vector<pair<int, int>> arr;
  dfs_rebuild(x, arr);
  if (dir == 1)
    root = regeneTree(0, arr.size(), NULL, arr);
  else if (dir == 2)
    x->dad->left = regeneTree(0, arr.size(), x->dad, arr);
  else
    x->dad->right = regeneTree(0, arr.size(), x->dad, arr);
  update(x->dad, true);
}

void find_and_rebuild(node now, node to) {
  int x = to->x;
  if (((now->left) && (double)now->left->size > (double)now->size * alpha) ||
      ((now->right) && (double)now->right->size > (double)now->size * alpha) ||
      (double)now->size - now->realsize > (double)now->size * (1 - alpha)) {
    rebuild(now);
    return;
  }
  if (now->x != x) find_and_rebuild(x < now->x ? now->left : now->right, to);
}

void insert(int x) {
  if (root == 0) {
    root = new Node(x, 0);
    return;
  }
  node cur = find(x, root);
  if (x == cur->x) {
    cur->cnt++;
    if (!cur->alive)
      cur->alive = true, cur->realsize++, cur->totalcnt++;
    else
      cur->totalcnt++;
  } else if (x < cur->x)
    cur->left = new Node(x, cur);
  else
    cur->right = new Node(x, cur);
  update(cur, true);
  find_and_rebuild(root, cur);
}

void remove(int x) {
  node cur = find(x, root);
  if (!cur->alive) return;
  cur->cnt--;
  if (!cur->cnt)
    cur->alive = false, cur->realsize--, cur->totalcnt--;
  else
    cur->totalcnt--;
  update(cur, true);
  find_and_rebuild(root, cur);
}

void remove(node cur) {
  if (!cur->alive) return;
  cur->cnt--;
  if (!cur->cnt)
    cur->alive = false, cur->realsize--, cur->totalcnt--;
  else
    cur->totalcnt--;
  update(cur, true);
  find_and_rebuild(root, cur);
}

int main() {
  insert(2);
  insert(1);
  insert(3);
  insert(4);
  insert(3);
  insert(4);
  remove(2);
  insert(5);
  insert(6);
  insert(7);
  insert(8);
  insert(9);
  insert(10);
  print(root);
  return 0;
}