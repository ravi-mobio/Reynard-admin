class Session {
  constructor() {
    this.token = "";
    this.email = "";
    this.password = "";
    this.fullName = "";
    this.rememberme = false;
    this.role = "";
    this.clear = false;
  }

  get userToken() {
    this.token = localStorage.getItem("token") || null;
    return this.token;
  }

  setUserToken = (tokens) => {
    this.token = tokens;
    localStorage.setItem("token", tokens);
  };

  get userEmail() {
    this.email = localStorage.getItem("email") || null;
    return this.email;
  }

  setUserEmail = (email) => {
    this.email = email;
    localStorage.setItem("email", email);
  };

  get userPassword() {
    this.password = localStorage.getItem("password") || null;
    return this.password;
  }

  setUserPassword = (password) => {
    this.password = password;
    localStorage.setItem("password", password);
  };

  get userRememberme() {
    this.rememberme = localStorage.getItem("rememberme") || false;
    return this.rememberme;
  }

  setUserRememberMe = (rememberme) => {
    this.rememberme = rememberme;
    localStorage.setItem("rememberme", rememberme);
  };

  get userFullName() {
    this.fullName = localStorage.getItem("fullName") || null;
    return this.fullName;
  }

  setUserFullName = (fullName) => {
    this.fullName = fullName;
    localStorage.setItem("fullName", fullName);
  };

  get userRole() {
    this.role = localStorage.getItem("role") || null;
    return this.role;
  }

  setUserRole = (role) => {
    this.role = role;
    localStorage.setItem("role", role);
  };

  setClear = () => {
    this.clear = true;
    localStorage.clear();
  };
}

export default new Session();
