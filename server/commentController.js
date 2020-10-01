const getAllComments = async (db) => {
    const comments = await db.get_comments()
    return comments
}

module.exports = {
    getComments: async (req, res) => {
        const db = req.app.get('db')
        const comments = await getAllComments(db)
        res.status(200).send(comments)
    },

    addComment: async (req, res) => {
        const db = req.app.get('db')

        const { id } = req.session.user

        const { content } = req.body

        await db.add_comment([id, content])

        const comments = await getAllComments(db)
        res.status(200).send(comments)
    },

    editComment: async (req, res) => {
        const db = req.app.get('db')

        const { content } = req.body

        const { post_id } = req.params

        await db.edit_comments([content, post_id])

        const comments = await getAllComments(db)
        res.status(200).send(comments)
    },

    deleteComment: async (req, res) => {
        const db = req.app.get('db')

        const { post_id } = req.params

        await db.delete_comment([post_id])

        const comments = await getAllComments(db)
        res.status(200).send(comments)
    },
}