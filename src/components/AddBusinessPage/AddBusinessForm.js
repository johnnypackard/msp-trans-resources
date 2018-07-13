import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.user,
  });

  class AddBusinessForm extends Component {
      constructor() {
          super();
          this.state = 
              {

                biz_name: '',
                contact_name: '',
                address: '',
                gender: '',
                race: '',
                language: '',
                image_url: ''

              } 
          
      }

      handleChange = (value) => (event) => {
          this.setState({
              ...this.state, [value]: event.target.value
          });
      }

      handleSubmit = (event) => {
          event.preventDefault();
          this.sendItemToRedux();
          console.log('This is being sent:', this.state);
      }

      sendItemToRedux = () => {
        //   const body = this.state;
          const action = {type: 'ADD_BUSINESSES', payload: {...this.state}};

          this.props.dispatch(action)
        //   console.log(body);
      }

      handleOnClick = () => {
          this.sendItemToRedux();
          alert('Thanks for adding your business!');
      }

      render() {
          return(
              <div>
                <div>
                    <h2>What's your favorite scary movie?'</h2>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input onChange={this.handleChange('biz_name')} placeholder="Business Name" value={this.state.biz_name} name="Business Name" />
                        </div>
                        <div>
                            <input onChange={this.handleChange('contact_name')} placeholder="Contact Name" value={this.state.contact_name} name="Contact Name" />
                        </div>
                        <div>
                            <input onChange={this.handleChange('address')} placeholder="Address" value={this.state.address} name="Address" />
                        </div>
                        <div>
                            <input onChange={this.handleChange('gender')} placeholder="Gender" value={this.state.gender} name="Gender" />
                        </div>
                        <div>
                            <input onChange={this.handleChange('race')} placeholder="Race" value={this.state.race} name="Race" />
                        </div>
                        <div>
                            <input onChange={this.handleChange('language')} placeholder="Language" value={this.state.language} name="Language" />
                        </div>
                        <div>
                            <input onChange={this.handleChange('image_url')} placeholder="Image URL" value={this.state.image_url} name="Image URL" />
                        </div>
                        <button>
                        State your business!
                        </button>
                    </form>

                </div>    
              </div>
        );
      }
  }

  export default connect(mapStateToProps)(AddBusinessForm);