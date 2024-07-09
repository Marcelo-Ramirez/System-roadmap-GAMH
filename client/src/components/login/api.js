const queryLogin = async (username, password) => {
    const response = await fetch(`${window.origin}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        let messageJson = await response.json();
        throw new Error(messageJson.message);
    }

    return await response.json();
};

const queryRegister = async (username, password, area) => {
    const response = await fetch(`${window.origin}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, area }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return await response.json();
};

export { queryLogin, queryRegister };
