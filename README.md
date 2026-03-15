# KidsSafe

KidsSafe is a tool to create and share a community safety map on smartphones and computers. Users can edit and upload CSV data using Excel or Numbers to update the map.

## Demo
- [Echizen City Kunitaka Area](https://code4fukui.github.io/kunitaka)
- [Fukui City Natsume Area](https://code4fukui.github.io/kidssafe-natsume)
- [Echizen City Okamoto Area](https://code4fukui.github.io/kidssafe-okamoto)

## Features
- Create and share a community safety map
- Edit and upload CSV data to update the map

## Requirements
- [Deno](https://deno.land/) to run the development server

## Usage
1. Create a new repository by using the [kidssafe-template](https://github.com/code4fukui/kidssafe-template/) template, naming it "kidssafe-" followed by the area name.
2. Customize the [README.md](README.md), [app settings](index.html), and [data](index.csv) to fit the target area.
3. Set up GitHub Pages (in Settings > Pages) to publish the site.
4. Refer to the [kidssafe-template](https://github.com/code4fukui/kidssafe-template/) for details on updating the data.

## Development
### Clone the repository
1. Install [GitHub Desktop](https://desktop.github.com/)
2. Press the green "Code" button and select "Open with GitHub Desktop"
3. Install [Deno](https://deno.land/)
4. Run the following in the kidssafe directory:
```sh
deno run --allow-net --allow-read https://taisukef.github.io/liveserver/liveserver.js
```
5. Open the displayed link in a browser (e.g., [http://[::]:7001/](http://[::]:7001/))
6. Edit files like [index.html](index.html) (changes will be automatically reflected in the browser)
7. Create a new branch in GitHub Desktop and submit a pull request

## License
MIT License