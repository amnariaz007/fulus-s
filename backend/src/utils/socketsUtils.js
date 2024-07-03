

export const computeSocketsByUserId = (userId, sockets) => {
    return sockets.filter((socket, index) => {
        return Number(socket.handshake.auth.userId) === Number(userId)
    });
}

export const computeSocketByUserId = (userId, sockets) => {
    const result = computeSocketsByUserId(userId, sockets);
    return result[0] ?? null;
}