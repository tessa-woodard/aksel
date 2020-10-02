const getAllPosts = async (db) => {
    const posts = await db.get_posts()
    const postsWithComments = await Promise.all(posts.map(async post => {
        const comments = await db.get_comments_by_post_id([post.id])
        return { ...post, comments }
    }))
    return postsWithComments
}

module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const posts = await getAllPosts(db)
        res.status(200).send(posts)
    },

    addPost: async (req, res) => {
        const db = req.app.get('db')

        const { id } = req.session.user

        const { content } = req.body

        await db.add_post([id, content])

        const posts = await getAllPosts(db)
        res.status(200).send(posts)
    },

    editPost: async (req, res) => {
        const db = req.app.get('db')

        const { content } = req.body

        const { post_id } = req.params

        await db.edit_post([content, post_id])

        const posts = await getAllPosts(db)
        res.status(200).send(posts)
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')

        const { post_id } = req.params

        await db.delete_post([post_id])

        const posts = await getAllPosts(db)
        res.status(200).send(posts)
    },
}