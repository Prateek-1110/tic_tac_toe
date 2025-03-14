/*
Jai Shri Krishna 
This is tic tac toe by Prateek Agrahari 
Hope you enjoy it 
*/
#include<bits/stdc++.h>
using namespace std;

char board[3][3] = { {'-', '-', '-'}, {'-', '-', '-'}, {'-', '-', '-'} };
vector<pair<int, int>> moves; 

void printBoard() {
    cout << "Current Board:\n";
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

bool isMoveLeft() {
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (board[i][j] == '-') return true;
    return false;
}

bool checkWin(char player) {
    for (int i = 0; i < 3; i++)
        if ((board[i][0] == player && board[i][1] == player && board[i][2] == player) ||
            (board[0][i] == player && board[1][i] == player && board[2][i] == player))
            return true;

    if ((board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
        (board[0][2] == player && board[1][1] == player && board[2][0] == player))
        return true;

    return false;
}

void playerMove() {
    int move;
    while (true) {
        cout << "Enter your move (1-9) or 0 to exit: ";
        cin >> move;
        if (move == 0) {
            cout << "You have exited the game. Goodbye!\n";
            exit(0);
        }
        move--;
        int row = move / 3, col = move % 3;
        if (move >= 0 && move < 9 && board[row][col] == '-') {
            board[row][col] = 'X';
            moves.push_back({row, col});
            break;
        } else {
            cout << "Invalid move! Try again.\n";
        }
    }
}

void computerMove() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i][j] == '-') {
                board[i][j] = 'O';
                if (checkWin('O')) {
                    moves.push_back({i, j});
                    return;
                }
                board[i][j] = '-';
            }
        }
    }

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i][j] == '-') {
                board[i][j] = 'X';
                if (checkWin('X')) {
                    board[i][j] = 'O';
                    moves.push_back({i, j});
                    return;
                }
                board[i][j] = '-';
            }
        }
    }

    if (board[1][1] == '-') {
        board[1][1] = 'O';
        moves.push_back({1, 1});
        return;
    }

    int corners[4][2] = {{0,0}, {0,2}, {2,0}, {2,2}};
    for (int i = 0; i < 4; i++) {
        int r = corners[i][0], c = corners[i][1];
        if (board[r][c] == '-') {
            board[r][c] = 'O';
            moves.push_back({r, c});
            return;
        }
    }

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i][j] == '-') {
                board[i][j] = 'O';
                moves.push_back({i, j});
                return;
            }
        }
    }
}

void removeLastTwoMoves() {
    for (int i = 0; i < 2 && !moves.empty(); i++) {
        pair<int, int> lastMove = moves.back();
        board[lastMove.first][lastMove.second] = '-';
        moves.pop_back();
    }
}

void playGame() {
    srand(time(0));
    cout << "Welcome to Tic-Tac-Toe!\n";
    printBoard();

    while (true) {
        playerMove();
        printBoard();
        if (checkWin('X')) {
            cout << "You win!\n";
            return;
        }
        if (!isMoveLeft()) {
            removeLastTwoMoves();
            printBoard();
            continue;
        }

        cout << "Computer's turn...\n";
        computerMove();
        printBoard();
        if (checkWin('O')) {
            cout << "Computer wins!\n";
            return;
        }
        if (!isMoveLeft()) {
            removeLastTwoMoves();
            printBoard();
            continue;
        }
    }
}

int main() {
    playGame();
    return 0;
}
