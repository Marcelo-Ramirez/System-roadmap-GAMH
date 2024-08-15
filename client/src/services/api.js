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

const queryValidToken = async () => {
    const response = await fetch(`${window.origin}/validkey`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Invalid key');
    }

    return await response.json();
}

const queryLogout = async () => {
    const response = await fetch(`${window.origin}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Esto asegura que las cookies se envíen junto con la solicitud
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    // Borrar el token de las cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return await response.json();
};

export { queryLogin, queryRegister, queryValidToken, queryLogout };
