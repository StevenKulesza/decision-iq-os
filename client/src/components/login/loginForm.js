// packages
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form } from 'reactstrap';
import { css } from 'emotion'

// redux
import { login } from '../../actions/auth'
import { addFlashMessage } from '../../actions/messages'
// components
import TextFieldGroup from '../global/TextFieldGroup'
import loginValidation from '../../utils/loginValidation'
import AlertMessage from '../global/alert/alert'

// styles
import * as styles from '../../styles/login/login'
import * as button from '../../styles/button/button'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });

     this.props.login(this.state)
      .then(
        (res) => this.props.onSuccess(),
        (err) => {
          console.log('error! ' + err)
          this.setState({ errors: err, isLoading: false })
          this.props.addFlashMessage({
            type: 'error',
            text: 'Invalid Username or Password.'
          });
          this.props.onFailure();
        }
      );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // use bootstrap frontend validation instead
    const { errors, email, password, isLoading } = loginValidation(this.state);

    return (
      <Form onSubmit={this.onSubmit} className={css`${styles.formSignin}`}>
        <h1 className="mb-4">Welcome</h1>

        { errors.form && <AlertMessage color='danger' message={errors.form}/> }
        { this.props.messages[0] && <AlertMessage color='info' message={ this.props.messages[0].text } />}

        <TextFieldGroup
          field="email"
          value={email}
          error={errors.email}
          onChange={this.onChange}
          type="email"
        />

        <TextFieldGroup
          field="password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><Button className={css`${button.btn}` + " btn btn-block"} color='primary' type="submit" disabled={isLoading}>Sign in</Button></div>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.defaultProps = {
  onSuccess: () => {},
  onFailure: () => {}
}

const mapStateToProps = (state) => ({
  messages: state.messages,
})

const mapDispatchToProps = dispatch => ({
  addFlashMessage: (message) => dispatch(addFlashMessage(message)),
  login: (data) => dispatch(login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


