import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let {title, desc, imageUrl, newsUrl, author, date} = this.props;
        return (
            <div className="my-2">
                <div className="card">
                    <img src={imageUrl?imageUrl : "https://s.w-x.co/in-mars%281%29.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <p className="card-text"><small className="text-muted">By {author?author : "Unknown"} on {new Date(date).toGMTString()}</small></p> 
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
