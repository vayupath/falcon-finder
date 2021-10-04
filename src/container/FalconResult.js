import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../store/action/index';
import * as STYLE from '../Style';

class FalconResult extends Component {
  reset = () => {
    this.props.reset();
    this.props.history.push('/');
  };

  render() {
    return (
      <React.Fragment>
        <div className='flex flex-col items-center justify-center h-full mt-24 p-12'>
          {this.props.falconeFound != 'NOT_FOUND' && (
            <div className='flex flex-col '>
              <div className='flex justify-start mb-3 md:justify-center  items-center'>
                <span className='font-semibold text-indigo-700 md:text-4xl text-2xl'>
                  {' '}
                  Success! Congratulation on finding Falocn
                </span>
              </div>
              <div className='flex justify-start md:justify-center items-center'>
                <span className='text-xl text-indigo-700 md:text-3xl'>
                  Time Taken: {this.props.totaljourneyTime}
                </span>
              </div>
              <div className='flex justify-start md:justify-center items-center mb-10'>
                <span className='text-xl text-indigo-700 md:text-3xl'>
                  Planet Found: {this.props.falconeFound}
                </span>
              </div>
            </div>
          )}
          {this.props.falconeFound == 'NOT_FOUND' && (
            <div className={STYLE.flex_row_center + ' h-full'}>
              <div className='flex justify-start md:justify-center  items-center mb-3'>
                <span className='font-semibold text-indigo-700 md:text-4xl text-2xl'>
                  Failed! Sorry cannot find Falcon
                </span>
              </div>
            </div>
          )}
          <div className={STYLE.flex_row_center}>
            <button type='button' onClick={this.reset} className={STYLE.btn}>
              Start Again !
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totaljourneyTime: state.JourneyReducer.totalJourneyTime,
    falconeFound: state.JourneyReducer.falconeFound,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(action.reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FalconResult);
