// Program to calculate current age based on birth year
#include <stdio.h>
#define CURRENT_YEAR 2026  // Defining the current year

int calculateAge(int birthYear);  // Function declaration

int main() {
    int birthYear, age;

    printf("Enter your birth year: ");
    scanf("%d", &birthYear);  // Input from the user

    age = calculateAge(birthYear);  // Calculate the age
    printf("Your age is %d\n", age);  // Output the age

    return 0;  // End of program
}

// Function to calculate age
int calculateAge(int birthYear) {
    return CURRENT_YEAR - birthYear;  // Return the age
}