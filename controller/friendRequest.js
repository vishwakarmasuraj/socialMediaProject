const FriendRequest = require('../models/friendsRequest')

const sendingRequestA = async (req, res) => {
    const docA = await FriendRequest.findOneAndUpdate(
        { requestFrom: UserA, requestTo: UserB },
        { $set: { status: 'Open' } },
        { upsert: true, new: true }
    )
    const docB = await FriendRequest.findOneAndUpdate(
        { requestFrom: UserA, requestTo: UserB },
        { $set: { status: 'Close' } },
        { upsert: true, new: true }
    )
    const updateUserA = await User.findOneAndUpdate(
        { id: UserA },
        { $push: { friends: docA.id } }
    )
    const updateUserB = await User.findOneAndUpdate(
        { id: UserB },
        { $push: { friends: docB.id } }
    )
}