import React, { Component } from 'react'
import SearchInput, {  } from '../../../../components/RestActions/SearchInput'

export default class MailSearchBox extends Component {
  onChangeText = () => {
    
  }

  render() {
    return (
      <div className="mailSearchBox">
        <SearchInput
          onTextSearch={this.onChangeText} 
          placeholder="Tìm kiếm mail" />
      </div>
    )
  }
}
