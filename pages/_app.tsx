import App from 'next/app';

// Provider
import { CharactersProvider } from '../src/context/characters';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <CharactersProvider>
        <Component {...pageProps} />
      </CharactersProvider>
    )
  }
}

export default MyApp