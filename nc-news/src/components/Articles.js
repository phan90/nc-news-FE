import React from 'react';
import PT from 'prop-types';
import { Link } from "react-router-dom";
import '../css/articles.css'

function Articles({ articles, match, search }) {
    const { topicId } = match.params
    articles = articles.filter(article => topicId ? article.belongs_to.title.toLowerCase() === topicId : true)
    articles = search ? articles.filter(article => String(Object.values(article)).toLowerCase().split(/,|\s/).includes(search)) : articles
    return (
        <div>
            {articles.sort((a, b) => (b.votes + b.commment_count) - (a.votes + a.commment_count)).map(article =>
                <div id="article" key={article._id}>
                    <Link to={`/articles/${article._id}`}>
                        <p id="articleTitle"><strong>{article.title}</strong></p>
                    </Link>
                    <p id="info">
                        <em>
                            Author: {article.created_by.username}
                        </em>
                        <br />
                        <Link to={`/topics/${article.belongs_to.title.toLowerCase()}`}>
                            {article.belongs_to.title}
                        </Link>
                    </p>
                    <p id="articleBody">{article.body.slice(0, 300)}...</p>
                    <div className="counter">
                        <li id="count">
                            <i className="fa fa-commenting-o"></i> {article.commment_count}
                        </li>
                        <li id="count">
                            <i className="fa fa-heart-o"></i> {article.votes}
                        </li>
                    </div>
                </div>
            )}
        </div>
    );
}

Articles.propTypes = {
    articles: PT.array.isRequired, 
    search: PT.string.isRequired
}


export default Articles;