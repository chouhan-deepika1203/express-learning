const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthInput(payload, { requireName = false } = {}) {
    if (requireName && (!payload.name || !payload.email || !payload.password || !payload.role)) {
        return 'Name, email, password and role are required';
    }

    if (!payload.email || !payload.password) {
        return 'Email and password are required';
    }

    if (!emailRegex.test(payload.email)) {
        return 'Invalid email format';
    }

    if (payload.password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    return null;
}
