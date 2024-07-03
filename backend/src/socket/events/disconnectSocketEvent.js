const disconnectSocketEvent = async (socket, fastify, {launchParams, userId, version}) => {
    socket.on('disconnect', () => {
        //console.log('disconnect', userId)
    })
}

export default disconnectSocketEvent;