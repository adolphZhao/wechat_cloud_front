import React,{Component,Input} from 'react';
import PropTypes from 'prop-types'

export default class Refresh extends Component {
  constructor(props) {
        super(props);

        this.state = {refresh:true};

        const { onRefresh } = this.props

        setInterval(()=>{
            this.setState({refresh:!this.state.refresh})
            onRefresh(this.state)
        },15000);
      }

  render () {
    return (
      <div>
      </div>
    )
  }
}

Refresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
}
