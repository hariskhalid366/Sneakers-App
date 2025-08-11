# Project Report: Sneakers Mobile App

## 1. Project Overview

The "Sneakers" project is a feature-rich mobile application for iOS and Android, built with React Native. It serves as a marketplace for sneakers, seamlessly blending traditional e-commerce functionality with modern Web3 features. The application allows users to browse, purchase, and trade sneakers as both physical products and as Non-Fungible Tokens (NFTs). It also includes features for social interaction, design customization, and even augmented reality. The primary goal of the application is to create a comprehensive and engaging experience for sneaker enthusiasts by combining the worlds of fashion, technology, and blockchain.

## 2. Core Features

The application boasts a wide array of features, catering to various user needs:

*   **E-commerce Platform:**
    *   **Product Browsing:** Users can browse a catalog of sneakers, view detailed product information, and filter products by category.
    *   **Shopping Cart:** A fully functional shopping cart allows users to add and manage items before purchase.
    *   **Checkout and Payments:** The app integrates with Stripe for secure and reliable payment processing.
    *   **Order Tracking:** Users can track the status of their orders within the app.

*   **NFT Marketplace:**
    *   **NFT Browsing:** Users can explore a collection of sneaker-themed NFTs.
    *   **NFT Minting:** The application allows users to "mint" NFTs, effectively creating a unique digital asset on the blockchain. This is handled through an integration with Thirdweb on the Sepolia testnet.
    *   **Bidding System:** Users can place bids on products, suggesting an auction-style marketplace.

*   **Design and Customization:**
    *   **"My Collections":** A dedicated section where users can view their own designs and creations.
    *   **Design Upload:** Users can upload their own sneaker designs, which are then displayed in their personal collection.

*   **Augmented Reality (AR):**
    *   The application includes code for an AR feature, which is currently disabled. This feature was likely intended to allow users to virtually "try on" sneakers using their device's camera.

*   **User Interaction and Social Features:**
    *   **AI-Powered Chatbot:** A "Sneakers Assistant" is available to help users, powered by Google's Generative AI.
    *   **User Profiles:** Users have profiles that can be viewed by others.
    *   **Notifications:** The app provides toast notifications for various events.

*   **Authentication:**
    *   The app supports multiple authentication methods, including email/password, Google Sign-In, and AWS Cognito. It also has support for Passkeys.

## 3. Architecture and Technology Stack

The application is built on a modern and robust technology stack:

*   **Frontend:** React Native
*   **Language:** TypeScript and JavaScript
*   **Styling:** Tailwind CSS (via NativeWind)
*   **State Management:** Redux Toolkit
*   **Navigation:** React Navigation (Stack and Drawer)
*   **Data Fetching:** TanStack Query (React Query)
*   **UI Components:** React Native Paper, Lottie for animations, and various other UI libraries.
*   **Storage:** MMKV for fast key-value storage and AsyncStorage for other data.

## 4. Web3 & Blockchain Integration

The application's Web3 functionality is a core part of its identity. It uses the following technologies to interact with the blockchain:

*   **Smart Contracts:**
    *   **ERC20:** The project includes the source code for a custom ERC20 token contract with advanced features like burning, capping, and pausing.
    *   **ERC721/ERC1155 (NFTs):** The NFT contracts are not included in the repository and are likely managed through Thirdweb's platform. The app interacts with these contracts for minting.
*   **Blockchain Interaction:**
    *   **Thirdweb SDK:** The application uses the Thirdweb SDK to simplify interactions with smart contracts, including wallet connections and transaction sending.
    *   **Wallet Support:** It supports connections to various wallets through Thirdweb's adapter, including Coinbase Wallet and WalletConnect.
*   **Blockchain Network:** The application is configured to interact with the Sepolia testnet, which is a common choice for development and testing of Ethereum-based applications.

## 5. Areas for Improvement/Future Development

*   **Activate AR Feature:** The AR "try-on" feature is a significant selling point for a sneaker app. Restoring and completing this feature would greatly enhance the user experience.
*   **Complete "Delete All" Functionality:** The "delete all" feature in the "My Collections" screen is currently disabled. This should be implemented with a confirmation dialog to prevent accidental data loss.
*   **Expand NFT Functionality:** The current NFT functionality is limited to minting. Future development could include a full-fledged marketplace for trading NFTs, including features like secondary sales, royalties, and an activity feed.
*   **Refine Smart Contracts:** The JavaScript snippet in the `ERC20.sol` file should be removed to avoid confusion and potential compilation issues.
*   **Code Cleanup:** There are several commented-out code blocks and unused imports throughout the codebase. A thorough cleanup would improve code quality and maintainability.
*   **Add Tests:** The project has a `__tests__` directory, but it's unclear how comprehensive the test suite is. Adding more unit and integration tests would improve the stability of the application.
