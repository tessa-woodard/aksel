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

        const { content, post_id } = req.body

        await db.add_comment([id, post_id, content])

        res.sendStatus(200)
    },

    editComment: async (req, res) => {
        const db = req.app.get('db')

        const { content } = req.body

        const { comment_id } = req.params

        await db.edit_comment([content, comment_id])

        res.sendStatus(200)
    },

    deleteComment: async (req, res) => {
        const db = req.app.get('db')

        const { comment_id } = req.params

        await db.delete_comment([comment_id])

        res.sendStatus(200)
    },
}