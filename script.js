// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  // Prompt for password length
  var length = parseInt(prompt("Enter the length of the password (between 8 and 128 characters):"));

  // Validate password length
  if (isNaN(length) || length < 8 || length > 128) {
    alert("Please enter a valid password length between 8 and 128 characters.");
    return;
  }

  // Confirm whether to include lowercase characters
  var includeLowercase = confirm("Include lowercase characters?");

  // Confirm whether to include uppercase characters
  var includeUppercase = confirm("Include uppercase characters?");

  // Confirm whether to include numeric characters
  var includeNumeric = confirm("Include numeric characters?");

  // Confirm whether to include special characters
  var includeSpecial = confirm("Include special characters?");

  // Validate that at least one character type is selected
  if (!includeLowercase && !includeUppercase && !includeNumeric && !includeSpecial) {
    alert("Please select at least one character type.");
    return;
  }

  // Return an object with selected options
  return {
    length: length,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}


// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) {
    return ""; // User canceled or entered invalid input
  }

  var allChars = [];
  var result = [];

  if (options.includeLowercase) {
    allChars = allChars.concat(lowerCasedCharacters);
    result.push(getRandom(lowerCasedCharacters));
  }

  if (options.includeUppercase) {
    allChars = allChars.concat(upperCasedCharacters);
    result.push(getRandom(upperCasedCharacters));
  }

  if (options.includeNumeric) {
    allChars = allChars.concat(numericCharacters);
    result.push(getRandom(numericCharacters));
  }

  if (options.includeSpecial) {
    allChars = allChars.concat(specialCharacters);
    result.push(getRandom(specialCharacters));
  }

  // Fill the remaining length with random characters from the selected types
  for (var i = result.length; i < options.length; i++) {
    result.push(getRandom(allChars));
  }

  // Shuffle the result array to mix up the character types
  result = result.sort(function() {
    return Math.random() - 0.5;
  });

  // Convert the result array to a string
  return result.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);