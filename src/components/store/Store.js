import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfs from "../../utils/ipfs";

import "./Store.css";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      description: '',
      image: '',
      btnText: 'See Products'
    };
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.loadAttributes();
    
  }


  loadAttributes() {
      ipfs.files.get(this.props.metadataHash).then(r => {
        const jsonMetadata = JSON.parse(r[0].content);
        if (this.mounted) {
        this.setState({
          storeName: jsonMetadata.storeName,
          description: jsonMetadata.description,
          image: jsonMetadata.image
        });
      }
      });

      if(this.props.isStoreOwner){
        this.setState({ btnText: 'Manage Store' });
      }

      
  }

  render() {
    const { id, isStoreOwner } = this.props;
    const { storeName, description, image, btnText } = this.state;

    return (
      <div className="col-md-4">
        <div className="card">
          <img className="card-img-top" src={image} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{storeName}</h5>
            <p className="card-text">{description}</p>
            <Link
              to={{
                pathname: `/store/${id}`,
                state: { isStoreOwner }
              }}
              className="btn btn-primary"
            >
              {btnText}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
