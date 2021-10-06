import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'



export class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 6,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }

    CapitalizeFunc = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.CapitalizeFunc(this.props.category)} - NationNews`;
    }

    async UpdateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=111fecbe73d546d489adf9ea40cd9c4c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.UpdateNews();
    }

    handleNextClick = async () => {
        this.setState({page : this.state.page+1});
        this.UpdateNews();
    }

    handlePrevClick = async () => {
        this.setState({page : this.state.page-1});
        this.UpdateNews();
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center mb-2">Top {this.CapitalizeFunc(this.props.category)} headlines</h1>
                {this.state.loading && <Spiner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 70) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                        </div>

                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-secondary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-sm btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News

