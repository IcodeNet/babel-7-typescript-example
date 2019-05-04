import React, { Component } from 'react'
import './App.scss'

interface Props {
  name: string
}

export class App extends Component<Props> {
  render () {
    return (
      <div>
        <button className={'btn-link'}>SCSS styled Button</button>
        Γεια Σου Κοσμε!! {this.props.name} from tsx!
      </div>
    )
  }
}
