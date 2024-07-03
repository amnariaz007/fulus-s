export const isPayoutAdmin = (userId) => {
    const admins = JSON.parse(process.env.PAYOUTS_ADMIN_IDS);
    return admins.includes(userId);
}

export const isTasksAdmin = (userId) => {
    const admins = JSON.parse(process.env.TASKS_ADMIN_IDS);
    return admins.includes(userId);
}