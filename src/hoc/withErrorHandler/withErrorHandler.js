import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        requestInterceptor = null;
        responseInterceptor = null;

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use( (request) => {
                this.setState( {error: null });
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use( response => response, error => {
                this.setState( {error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState( {error: null })
        };

        render() {
            return (
                <Aux >
                    <WrappedComponent {...this.props} />
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;

