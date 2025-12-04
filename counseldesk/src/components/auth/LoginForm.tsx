import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scss";

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        if (!email.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log("Login successful", formData);
            navigate("/calendar"); // Redirect to calendar
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Sign In</h2>

                <label>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Password</label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                <p>
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
