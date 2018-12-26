import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Select, Button } from 'antd';
import Link from 'next/link'
import Router from "next/router";
import algoliasearch from 'algoliasearch';
const algoliaAccount = require('../credentials/algoliaAccountKey.json')
var client = algoliasearch(algoliaAccount.app_id, algoliaAccount.api_key);
var algolia = client.initIndex('companies');


const Option = Select.Option;

class Banner extends React.PureComponent {
  static propTypes = {
    onEnterChange: PropTypes.func,
  }
  state = {
    onEnterChange: this.props.onEnterChange,
    value: "",
    data: [],
    fetching: false,
    isMobile: false,
  };

  searchDone = (err, content) => {
    if (err) console.log('searchDone, error: '+ err )

    const data = content.hits.map( co => ({
      name: `${co.name} - ${co.description}`,
      key: co.objectID,
    }));

    this.setState({ data, fetching: false });
  }

  handleSearch = (value) => {
    console.log('fetching company', value);
    this.setState({ data: [], fetching: true });
    algolia.search({
      query: value,
      hitsPerPage: 10
    }, 
      this.searchDone
    )
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  onSelect = (value) => {
    console.log(value)
    Router.push('/company?id='+value,'/company/'+value)
  }

  render() {
    const { fetching, data, value } = this.state;

  return (
    <section className="page banner-wrapper">
        <div className="banner-text-wrapper" >
          <h2>JP.VC.DB</h2>
          <div key="button1" className="start-buttonXXX clearfix">

            <Select className="banner-search"
              showSearch
              placeholder="Search companies"
              showArrow={false}
              defaultOpen={true}
              filterOption={false}
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              onSelect={this.onSelect}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              size="large"
            >
              {data.map(d => <Option key={d.key}><Link href={`/company?id=`+d.key} as={`/company/`+d.key}><a>{d.name}</a></Link></Option>)}
            </Select>
            <br />
            <Link href='/'><Button className="banner-button-dark">Random Company</Button></Link>
            <Link href='/'><Button className="banner-button-light">Suggest a New Company</Button></Link>
          </div>
        </div>
    </section>
  );

  }
}

export default Banner;