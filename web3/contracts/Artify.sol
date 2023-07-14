// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/*
    Coded By - Tanvir Ahmed Khan
*/
contract ArtMarketplace {
    // Structure for storing information about an artwork
    struct Artwork {
        uint256 id;
        string title;
        string description;
        string image;
        uint256 price;
        string artistCredentials;
        uint256 quantity;
        uint status;
        bool isLimitedEdition;
        address payable currentOwner;
        address payable firstOwner;
        bool verified;
    }

    // Mapping to store artworks using their ID
    mapping(uint256 => Artwork) public artworks;

    // Counter for tracking the number of artworks
    uint256 public artworkCount;

    // Mapping to store the registered suppliers, buyers, and verifiers
    mapping(address => bool) public suppliers;
    mapping(address => bool) public buyers;
    mapping(address => bool) public verifiers;

    // Mapping to store the artworks IDs against the supplier address
    mapping(address => uint[]) public suppliersArtworks;
    mapping(address => uint[]) public buyersArtworks;
    mapping(address => uint[]) public verifiersArtworks;

    // Mapping to store the current owner of each artwork
    mapping(uint256 => address) public artworkToOwner;

    // Function for buyers to request buying an artwork
    function reqbuyArtwork(
        uint256 _artworkId,
        uint _q
    ) external payable onlyBuyer {
        // Verify that the artwork exists and has enough quantity
        require(artworkExists(_artworkId), "Artwork does not exist");
        require(artworks[_artworkId].quantity >= _q, "Not enough artworks");
        require(msg.value >= _q, "Not enough money");

        // Get the current owner of the artwork
        address payable owner = artworks[_artworkId].currentOwner;

        // Update the artwork's status and ownership
        Artwork storage current = artworks[_artworkId];
        require(current.status == 0, "Rejected");
        current.status++;
        current.currentOwner = payable(msg.sender);
        current.quantity--;

        // Transfer payment to the current owner and royalty to the first owner if applicable
        uint val = msg.value;
        if (current.currentOwner != current.firstOwner) {
            address payable ownerF = artworks[_artworkId].firstOwner;
            uint royalty = (val / 100) * 2;
            ownerF.transfer(royalty);
            val -= royalty;
        }
        owner.transfer(val);
    }

    // Function for suppliers to initiate delivery of an artwork
    function initDelivery(uint _artworkId) external payable onlySupplier {
        // Get the artwork and verify its status
        Artwork storage current = artworks[_artworkId];
        require(current.status == 1, "Rejected");

        // Update the artwork's status
        current.status++;
    }

    function getInitArtworks(
        address sup
    ) public view returns (uint[] memory list) {
        // Artwork[] memory allartworks = new Artwork[](buyersArtworks[sup].length);
        uint cnt = suppliersArtworks[sup].length;
        uint[] memory temp = new uint[](cnt);

        for (uint i = 0; i < cnt; i++) {
            Artwork storage current = artworks[suppliersArtworks[sup][i]];
            if (current.status == 1) {
                temp[i] = (suppliersArtworks[sup][i] + 1);
            }
        }

        return temp;
    }

    // Function to get the status of an artwork
    function getStatus(
        uint _artworkId
    ) public view returns (string memory statusss) {
        uint st = artworks[_artworkId].status;
        if (st == 0) {
            return "NULL";
        } else if (st == 1) {
            return "Requested";
        } else if (st == 2) {
            return "Initiated";
        } else if (st == 3) {
            return "Delivered";
        }
    }

    // Function for buyers to buy an artwork
    function buyArtwork(uint256 _artworkId) external payable onlyBuyer {
        // Verify that the artwork exists and the buyer has sent enough payment
        require(artworkExists(_artworkId), "Artwork does not exist");
        require(msg.value >= artworks[_artworkId].price, "Not enough money");

        // Get the current owner of the artwork
        address payable owner = artworks[_artworkId].currentOwner;

        // Update the artwork's status and ownership
        Artwork storage current = artworks[_artworkId];
        require(current.status == 2, "Rejected");
        current.status++;
        current.currentOwner = payable(msg.sender);
        current.quantity--;

        // Transfer payment to the current owner and royalty to the first owner if applicable
        uint val = msg.value;
        if (current.currentOwner != current.firstOwner) {
            address payable ownerF = artworks[_artworkId].firstOwner;
            uint royalty = (val / 100) * 2;
            ownerF.transfer(royalty);
            val -= royalty;
        }
        owner.transfer(val);

        // Store the artwork ID in the buyer's artworks list
        buyersArtworks[msg.sender].push(_artworkId);
    }

    // Modifier to only allow access for registered suppliers
    modifier onlySupplier() {
        require(
            suppliers[msg.sender],
            "Only registered suppliers can call this function"
        );
        _;
    }

    // Modifier to only allow access for registered buyers
    modifier onlyBuyer() {
        require(
            buyers[msg.sender],
            "Only registered buyers can call this function"
        );
        _;
    }

    // Modifier to only allow access for registered verifiers
    modifier onlyVerifier() {
        require(
            verifiers[msg.sender],
            "Only registered verifiers can call this function"
        );
        _;
    }

    // Function to register as a supplier
    function registerSupplier(address _address) external {
        require(
            suppliers[_address] == false,
            "Already registered as a supplier"
        );
        suppliers[_address] = true;
    }

    // Function to register as a buyer
    function registerBuyer(address _address) external {
        require(buyers[_address] == false, "Already registered as a buyer");
        buyers[_address] = true;
    }

    // Function to register as a verifier
    function registerVerifier(address _address) external {
        require(
            verifiers[_address] == false,
            "Already registered as a verifier"
        );
        verifiers[_address] = true;
    }

    // Function for a supplier to add a new artwork
    function addArtwork(
        string memory _description,
        string memory _title,
        string memory _image,
        uint256 _price,
        string memory _artistCredentials,
        uint256 _quantity,
        bool _isLimitedEdition
    ) external onlySupplier {
        // Increase the artworkCount

        // Create a new artwork and store its details
        artworks[artworkCount] = Artwork(
            artworkCount,
            _title,
            _description,
            _image,
            _price,
            _artistCredentials,
            _quantity,
            0,
            _isLimitedEdition,
            payable(msg.sender),
            payable(msg.sender),
            false
        );
        artworkCount++;

        // Store the artwork ID against the supplier's address
        suppliersArtworks[msg.sender].push(artworkCount);
    }

    // Function for a supplier to update the quantity of an artwork
    function updateArtworkQuantity(
        uint256 _artworkId,
        uint256 _quantity
    ) external onlySupplier {
        require(artworkExists(_artworkId), "Artwork does not exist");
        artworks[_artworkId].quantity = _quantity;
    }

    // Function for a supplier to offer a limited edition artwork
    function offerLimitedEditionArtwork(
        uint256 _artworkId
    ) external onlySupplier {
        require(artworkExists(_artworkId), "Artwork does not exist");
        artworks[_artworkId].isLimitedEdition = true;
    }

    // Function for a verifier to verify an artwork
    function verifyArtwork(uint256 _artworkId) external onlyVerifier {
        require(artworkExists(_artworkId), "Artwork does not exist");
        address artworkOwner = artworkToOwner[_artworkId];
        require(artworkOwner != address(0), "Invalid artwork owner");

        verifiersArtworks[msg.sender].push(_artworkId);

        artworks[_artworkId].verified = true;
    }

    // Function to check if an artwork exists
    function artworkExists(uint256 _artworkId) internal view returns (bool) {
        return (_artworkId > 0 && _artworkId <= artworkCount);
    }

    function getAllArtworks() public view returns (Artwork[] memory) {
        Artwork[] memory allartworks = new Artwork[](artworkCount);

        for (uint i = 0; i < artworkCount; i++) {
            Artwork storage item = artworks[i];

            allartworks[i] = item;
        }

        return allartworks;
    }

    // Function to get all the artworks of supplier
    function getSupplierArtworks(
        address sup
    ) public view returns (Artwork[] memory) {
        Artwork[] memory allartworks = new Artwork[](
            suppliersArtworks[sup].length
        );

        for (uint i = 0; i < suppliersArtworks[sup].length; i++) {
            allartworks[i] = artworks[suppliersArtworks[sup][i]];
        }
        return allartworks;
    }

    // Function to get all the artworks of buyers
    function getBuyerArtworks(
        address sup
    ) public view returns (Artwork[] memory) {
        Artwork[] memory allartworks = new Artwork[](
            buyersArtworks[sup].length
        );

        for (uint i = 0; i < buyersArtworks[sup].length; i++) {
            allartworks[i] = artworks[buyersArtworks[sup][i]];
        }
        return allartworks;
    }

    // Function to get all the artworks of verifiers
    function getVerifierArtworks(
        address sup
    ) public view returns (Artwork[] memory) {
        Artwork[] memory allartworks = new Artwork[](
            verifiersArtworks[sup].length
        );

        for (uint i = 0; i < verifiersArtworks[sup].length; i++) {
            allartworks[i] = artworks[verifiersArtworks[sup][i]];
        }
        return allartworks;
    }
}
