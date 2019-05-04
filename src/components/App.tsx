import React, { Component } from 'react'

interface Props {
  name: string
}

export class App extends Component<Props> {
  render () {
    return (
      <div>
        Γεια Σου Κοσμε!! {this.props.name} from tsx!
      </div>
    )
  }
}
