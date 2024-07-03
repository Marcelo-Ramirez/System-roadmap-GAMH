const queryLogin = async (username, password) => {
    const response = await fetch(`${window.origin}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
};

const queryRegister = async (username, password) => {
    const response = await fetch(`${window.origin}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return await response.json();
};

export { queryLogin, queryRegister };
