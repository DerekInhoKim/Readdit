export const getSubscriptions = async (id) => {
    const response = await fetch(`/api/users/${id}`)
    let user = await response.json()
    return user.subscriptions
}
