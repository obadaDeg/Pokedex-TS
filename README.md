# Pokedex-TS

A CLI Pokedex application built with TypeScript as part of the [Boot.dev](https://www.boot.dev) backend development curriculum.

This is the **1st project** in the **4th course** of the [Foothill Training plan](https://www.boot.dev/u/obadadaghlas), covering TypeScript fundamentals through building an interactive Pokemon explorer.

## About

Pokedex-TS is a terminal-based REPL that lets you explore the Pokemon world using the [PokeAPI](https://pokeapi.co/). You can browse location areas, discover wild Pokemon, catch them, and build your own Pokedex.

### Course Chapters

**Chapter 1 - The REPL**
- Interactive command-line interface with readline
- Command registry pattern with a centralized `State` object
- Input parsing and command routing
- Commands: `help`, `exit`, `map`, `mapb`, `explore`, `catch`, `inspect`, `pokedex`

**Chapter 2 - Caching**
- Generic cache implementation with automatic expiration
- Timed reap loop to clean up stale entries
- Integrated into all PokeAPI requests to avoid redundant network calls

**Chapter 3 - PokeAPI Integration**
- Location area browsing with pagination (`map` / `mapb`)
- Location exploration to discover Pokemon
- Pokemon catching with experience-based difficulty
- Pokedex management to inspect caught Pokemon

## Getting Started

```bash
npm install
npm run build
npm start
```

For development (build + run):
```bash
npm run dev
```

Run tests:
```bash
npm test
```

## Commands

| Command | Description |
|---------|-------------|
| `help` | Shows available commands |
| `map` | Shows the next 20 location areas |
| `mapb` | Shows the previous 20 location areas |
| `explore <area>` | Lists Pokemon found in a location area |
| `catch <pokemon>` | Attempt to catch a Pokemon |
| `inspect <pokemon>` | View details of a caught Pokemon |
| `pokedex` | Lists all caught Pokemon |
| `exit` | Exits the Pokedex |

## Future Goals

- [ ] Implement the `repl` Node module instead of raw readline
- [ ] Simulate battles between Pokemon
- [ ] Add more unit tests for edge cases
- [ ] Refactor code for better organization and testability
- [ ] Keep Pokemon in a "party" and allow them to level up
- [ ] Allow caught Pokemon to evolve after a set amount of time
- [ ] Persist the Pokedex to disk for saving progress between sessions
- [ ] Make exploration more interactive (e.g. directional choices instead of typing area names)
- [ ] Random encounters with wild Pokemon
- [ ] Support different ball types (Pokeballs, Great Balls, Ultra Balls) with varying catch rates

## Links

- [Boot.dev Profile](https://www.boot.dev/u/obadadaghlas)
- [GitHub Repository](https://github.com/obadaDeg/Pokedex-TS)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
