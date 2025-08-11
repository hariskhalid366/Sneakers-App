# Sneakers Mobile App

![Sneakers App Banner](assets/background.png)

Welcome to the Sneakers mobile app repository! This is a feature-rich mobile application for iOS and Android that serves as a marketplace for sneakers, blending traditional e-commerce with modern Web3 features.

## 🚀 Features

*   👟 **E-commerce Store:** Browse, search, and purchase the latest sneaker releases.
*   🖼️ **NFT Marketplace:** Mint exclusive sneaker-themed NFTs on the blockchain.
*   🎨 **Create & Share Designs:** Upload and showcase your own sneaker designs.
*   🤖 **AI-Powered Assistant:** Get help and recommendations from our "Sneakers Assistant".
*   🔐 **Secure Payments:** Powered by Stripe for fast and secure transactions.
*   🔗 **Web3 Integrated:** Connect your wallet and manage your digital assets.
*   🕶️ **Augmented Reality:** (Work in Progress) Virtually try on sneakers before you buy.

## 🛠️ Tech Stack

This project is built with a modern and powerful stack:

*   **Framework:** [React Native](https://reactnative.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) & JavaScript
*   **Styling:** [Tailwind CSS (NativeWind)](https://www.nativewind.dev/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Navigation:** [React Navigation](https://reactnavigation.org/)
*   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
*   **Blockchain:** [Thirdweb SDK](https://thirdweb.com/)
*   **Payments:** [Stripe](https://stripe.com/)
*   **Authentication:** [AWS Cognito](https://aws.amazon.com/cognito/), [Google Sign-In](https://developers.google.com/identity/sign-in/android), and [Passkeys](https://passkeys.dev/)

## 🏁 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or higher)
*   [Yarn](https://yarnpkg.com/)
*   [React Native CLI](https://reactnative.dev/docs/environment-setup)
*   [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sneakers-app.git
    cd sneakers-app
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary API keys and configuration.

4.  **Install iOS dependencies:**
    ```bash
    cd ios && pod install && cd ..
    ```

### Running the App

1.  **Start the Metro bundler:**
    ```bash
    yarn start
    ```

2.  **Run on Android:**
    ```bash
    yarn android
    ```

3.  **Run on iOS:**
    ```bash
    yarn ios
    ```

## CONTRIBUTING

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
