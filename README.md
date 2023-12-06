# SmallClaims Assignment
## Tasks
* dashboard
    - [] create dashboard in HTML
    - [] style dashboard in CSS
    - [] make dashboard responsive for desktop, tablet and mobile
* fetch users
    - [] fetch the users from the JSON placeholder API
    - [] display the users from the JSON placeholder API in the list of users
    - [] sort the list of users alphabetically
* add user form
    - [] write a regular expression which only accepts letters, no spaces
    - [] add HTML attributes which limit the amount of characters which
    * provide visual communication:
        - [] green border if the regular expression passes
        - [] red border if the regular expression doesn't pass
        - [] a message if the regular expression doesn't pass
        - [] no border if no value provided
    - [] the form can be submitted only if the input field contains a value
    - [] the form can be submitted by pressing the Enter key
    - [] when the form is submitted, the value is deleted from the input field
* displaying users
    * when a user in the list of users is clicked:
        - [] a user window pops-up (if a user is clicked the first time)
        - [] the clicked user is highlighted in the list of users
        * the user window contains:
            - [] the name of the user
            - [] a list of possible nationalities
            * the list of possible nationalities:
                - [] is sorted from highest probability to lowest
                - [] contains country flags next to each nationality
                - [] percentage of probability next to each nationality
        - [] when another user is clicked, the information in the user window updates

## Goals
* separate logic in different JS files
* bundle the separate JS files using Vite
* lint the code using ESLint
* turn the JavaScript code into TypeScript code