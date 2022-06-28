class RoleService {
  setLocalRole(role) {
    localStorage.setItem('role', role);
  }

  getLocalRole() {
    return localStorage.getItem('role');
  }

  updateLocalRole(role) {
    localStorage.setItem('role', role);
  }

  removeLocalRole() {
    localStorage.removeItem('role');
  }
}

export default new RoleService();
