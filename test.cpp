#include <iostream>

using namespace std;

 

typedef struct Node

{

       Node* next;

       int iData;

}ReNode,*ReLinkList;

 

//////////////////////////////////////////////////////////////////////////

// n代表的是建立n个链接点，m表示要报的数字，每次数到多少的之后就可以推出；k表示开始数数的编号。

void Josephus(int n,int m,int k)

{

       ReLinkList p,r,head = NULL;

       for (int i = 1;i <= n;++ i)  // 编号从一开始的

       {

              p = (ReLinkList)malloc(sizeof(ReNode));

              p->iData = i;

              if (head == NULL)

              {

                     head = p;

              }

              else

              {

                     r->next = p;

              }

              r = p;

       }

       p->next = head;

       p = head;

       for (i = 1;i < k;++ i)

       {

              r = p;

              p = p->next;   

       }                      // 此时p从第一个结点出发，

       while(p->next != p)

       {

              for (int i = 1;i < m; ++ i)

              {

                     r = p;

                     p = p->next;

              }

              r->next = p->next;

              cout << p->iData << endl;   // 输出一个结点的编号；

              free(p);

              p = r->next;        // p指向新的出发结点;

       }

       cout << "最后被删除的结点为：" << endl;

       cout << p->iData << endl;

}

int main(int argc,char* argv[])

{

       int a = 5;

       int b = 3;

       int c = 2;

       cout << "请输入总共的人数、密码的大小和从第几个人开始的整数：" << endl;

       cin >> a >> b >> c;

       Josephus(a,b,c);

       cin >> a;

       return 0;

}
