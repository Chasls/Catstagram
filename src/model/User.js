export default class User {
    constructor(
      email,
      password,
      followerCount,
      points,
      firstName,
      lastName,
      aboutMe
    ) {
      this.email = email;
      this.password = password;
      this.followerCount = followerCount;
      this.points = points;
      this.firstName = firstName;
      this.lastName = lastName;

    }
  
    // Setters ---------
    set email(email) {
      this.email = email;
    }
  
    set password(password) {
      this.password = password;
    }
  
    set followerCount(followerCount) {
      this.followerCount = followerCount;
    }
  
    set points(points) {
      this.points = points;
    }
  
    set firstName(firstName) {
      this.firstName = firstName;
    }
  
    set lastName(lastName) {
      this.lastName = lastName;
    }    
  
  
    // Getters ---------
  
    get email() {
      return this.email;
    }
  
    get password() {
      return this.password;
    }
  
    get followerCount() {
      return this.followerCount;
    }
  
    get points() {
      return this.points;
    }
  
    get firstName() {
      return this.firstName;
    }
  
    get lastName() {
      return this.lastName;
    }

    
  }