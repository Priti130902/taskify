export const login = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", "demo-token");
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};
