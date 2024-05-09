# Impression and Click Counter

This JavaScript code provides functionality to track impressions and clicks on specific elements (wrappers) within an HTML page. It allows you to set a total click threshold and a reset interval, and supports toggling the display of counts for individual wrappers.

## Features

- Track impressions and clicks for multiple wrappers on a page
- Set a total click threshold to hide wrappers after a certain number of clicks
- Specify a reset interval to automatically reset counters and show wrappers again
- Toggle the display of counts for individual wrappers
- Use localStorage to persist counts across page reloads
- Generate a unique identifier for each visitor to track their counts separately

## Installation

1. Clone the repository or download the source code files.

2. Include the JavaScript code in your HTML file or link to it as an external script. Place the `<script>` tag before the closing `</body>` tag.

   ```html
   <script src="https://cdn.jsdelivr.net/gh/chamuditha4/stats@latest/st.js" data-total-click-threshold="10" data-reset-interval="86400"></script>
   ```

   Adjust the `src` attribute to match the path to your JavaScript file.

3. Add the necessary HTML structure for the wrappers you want to track. Each wrapper should have the `class` attribute set to `"wrapper"` and a unique identifier for tracking purposes.

   ```html
   <div class="wrapper" data-count-enabled="true">
     <h1>Click Me!</h1>
     <p>Impressions: <span class="impressions"></span></p>
     <p>Clicks: <span class="clicks"></span></p>
   </div>
   ```

   Repeat this structure for each wrapper you want to track.

4. Customize the total click threshold and reset interval by modifying the `data-total-click-threshold` and `data-reset-interval` attributes in the `<script>` tag.

   - `data-total-click-threshold`: The maximum number of total clicks allowed before hiding the wrappers.
   - `data-reset-interval`: The time interval (in seconds) after which the counters will be reset and the wrappers will be shown again.

5. To enable or disable the display of counts for a specific wrapper, add the `data-count-enabled` attribute to the wrapper element and set its value to `"true"` or `"false"`.

   ```html
   <div class="wrapper" data-count-enabled="true">
     <!-- Counts will be displayed for this wrapper -->
   </div>

   <div class="wrapper" data-count-enabled="false">
     <!-- Counts will not be displayed for this wrapper -->
   </div>
   ```

6. Open the HTML file in a web browser, and the impression and click tracking will start automatically.

## Usage

- The code tracks impressions and clicks for each wrapper element separately.
- Impressions are incremented when the page loads, and clicks are incremented when a wrapper is clicked.
- The total number of clicks across all wrappers is tracked, and when it reaches the specified threshold, all wrappers are hidden.
- The counters are reset, and the wrappers are shown again after the specified reset interval.
- The code uses localStorage to store the counts and a unique identifier for each visitor, allowing the counts to persist across page reloads.
- The display of counts can be toggled for individual wrappers using the `data-count-enabled` attribute.

## Customization

- You can modify the JavaScript code to adjust the behavior or add additional functionality as needed.
- The CSS styles for the wrappers and count elements can be customized to match your desired design.
- The total click threshold and reset interval can be changed by modifying the values of the `data-total-click-threshold` and `data-reset-interval` attributes in the `<script>` tag.

## Browser Compatibility

The code uses modern JavaScript features and APIs, such as `querySelector`, `localStorage`, and `addEventListener`. It should work in most modern web browsers that support these features.

## License

This code is provided under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as needed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/your-username/your-repository).

## Support

If you have any questions or need assistance, please contact jayasena940[at]gmail[dot]com.

## Acknowledgements

- The code for generating a unique identifier is based on the UUID format.
- Special thanks to the contributors and supporters of this project.
