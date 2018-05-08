import axios from 'axios'
const url = "https://ncnewss.herokuapp.com/api"

export const getArticles = () => {
    return axios.get(`${url}/articles`)
        .then(res => res.data.articles
        )
}

export const getArticleComments = (articleId) => {
    return axios.get(`${url}/articles/${articleId}/comments`)
        .then(res => res.data.comments)
}

export const getUser = (username) => {
    return axios.get(`${url}/users/${username}`)
        .then(res => res.data.user)
}

export const postComment = (articleId, comment) => {
    return axios.post(`${url}/articles/${articleId}/comments`, comment)
        .then(res => res.data)
}

export const putCommentVote = (commentId, vote) => {
    return axios.patch(`${url}/comments/${commentId}/?vote=${vote}`)
        .then(res => console.log(res))
}

export const putArticleVote = (articleId, vote) => {
    return axios.patch(`${url}/articles/${articleId}/?vote=${vote}`)
        .then(res => console.log(res))
}

export const deleteComment = (commentId) => {
    return axios.delete(`${url}/comments/${commentId}`)
        .then(res => console.log(res))
}