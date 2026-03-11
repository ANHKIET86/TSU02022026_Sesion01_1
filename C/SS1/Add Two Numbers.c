// Program to add two numbers
#include <stdio.h>

int add(int, int);  // Function declaration

int main() {
    int num1, num2, sum;
    
    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);  // Taking input from the user

    sum = add(num1, num2);  // Calling the add function
    printf("Sum = %d\n", sum);  // Output the sum

    return 0;  // End of program
}

// Function to add two numbers
int add(int a, int b) {
    return a + b;  // Return the sum of two numbers
}
