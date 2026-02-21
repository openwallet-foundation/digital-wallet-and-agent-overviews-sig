# Structure

This document defines the different objects, how they are structured and how they relate to each other.

Each value includes a definition, the type of field and whether it is required. We only set a field as required when we think it is essential to be listed in the matrix. If a field is not required, it means it is extra information that _SHOULD_ be added as soon as possible.

## Core Values

These values are supported by all the different objects.

### Identifier (Name)

A unique identifier for the object. In case there are multiple versions of the same object, the version should be added to the identifier when there are differences between the versions that are not backwards compatible or have impact on the features the object supports.

- type: string
- required: true

### IPR Policy

Information on the status of patents and knowledge of possible IP rights are important for the adoption of new technologies. The document lists the known status of existing or expired patents or links to the IPR Policies that were in effect for the creation of standards and specifications. However, the existence of IPR policies does not guarantee the non-existence of patents from parties that were not involved in the process.

- type: string
- required: false

### Specification

Specifications are essential for interoperability and security assessments. Whenever specifications are publicly available then a link should be provided.

- type: string
- required: false

### Standardization

The standardization column describes under which standardization body and which working group the technology is standardized. It also describes what the status of the standard is or which standards track is intended for the future of emerging technologies.

- type: string
- required: false

### Implementation Support

For developers it is important to know to what extent the technology has been implemented. Therefore information is provided on which or how many software libraries are available.

- type: Array of links
- required: false

### Out of Scope

- **Technology readiness level**: It is very difficult to define a technology readiness level for a technology that is not yet standardized. The technology readiness level is also not a good indicator for the maturity of a technology. It is possible to have a technology that is very mature, but not yet standardized. It is also possible to have a technology that is standardized, but not yet mature.

---

## Credential Format

The format that is used to store the credential. This normally involves a format combining the claim and the signature into one object to define a credential.

### Selective Disclosure

Selective disclosure allows a holder to present a subset of the attributes of the credential issued by the issuer. This minimizes the amount of the holder's information that is shared with the verifier.

For example, the government issues a passport credential to Alice. The passport includes a variety of attributes, such as Alice's first name, last name, birthday, social security number, etc. When Alice wants to buy alcohol at the supermarket, she has to prove that she is of legal drinking age ($18+$). In the classical setting where Alice shows her passport, the supermarket sees all attributes, even though they only need her birthday. Using selective disclosure capabilities, she can simply present her birthday.

Selective disclosure can be achieved through:
1. **Signature algorithms** that support selective disclosure (e.g., BBS+ or CL signatures)
2. **Salted hash approach** in the credential format's design, where the salted hashes of the claims are signed (not the claims themselves)
3. **Governance**, where a community agrees on signing each attribute separately

In our matrix we only look at whether selective disclosure is achieved at the credential profile level through the signature algorithm.

- type: boolean
- required: false

### Predicates

Predicates allow the holder to further decrease the amount of information shared. Predicates check a value against a certain condition, resulting in true or false.

For example, Alice can prove she is older than 18 using the predicate _age_ $\geq 18$. If Alice's age is $20$, the predicate $20 \geq 18$ is true. This way Alice can prove she is allowed to buy alcohol without revealing her birthday or even her exact age.

Predicates can be created on various levels. On a governance level, the issuer could issue common predicates to holders, such as $18+$ and $65+$. In the matrix, we only consider predicates through the capability of performing Zero-Knowledge Proofs in the credential profile.

More information about predicates and zero-knowledge proofs can be found [here](https://medium.com/51nodes/selectively-disclosed-verifiable-credentials-79a236b81ee2).

- type: boolean
- required: false

### Crypto Agility

To support long-term security, the cryptographic algorithms used for encrypting, signing, and hashing should be updatable without losing features. Crypto agility could mean:

- Increasing the amount of bits for the keys
- Replacing the algorithm with a new one

It is difficult to predict when an algorithm will need to be updated. Typical scenarios:

- The algorithm is broken and security is suddenly lost
- The computation power available is high enough to perform a brute force attack in acceptable time
- Faster algorithms become available that are more efficient without losing features or lowering security

A relevant source is the recommendation of the German BSI (Federal Office for Information Security). They have published a [technical guideline for recommendations and key lengths](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TG02102/BSI-TR-02102-1.pdf?__blob=publicationFile&v=4) listing the algorithms and parameters to use.

- type: boolean
- required: false

### Encoding Scheme

There are various ways to encode the information within the credential, such as JSON, CBOR, etc. The encoding scheme can impact the size and parsing efficiency of credentials.

- type: string
- required: false

### Rich Schemas / Semantics

Rich schemas are hierarchically composable graph-based representations of complex data. They enable semantic understanding of the credential data by providing data or annotations that support machine-readable interpretation.

- type: boolean
- required: false

### Out of Scope

- **Compatibility with Signing Algorithms**: This is difficult to define since some features rely on specific signing algorithms. For example, selective disclosure may rely on BBS+ signatures, but VCs can use other signing algorithms where selective disclosure is not supported. In SD-JWT, the selective disclosure mechanism is independent of the signing algorithm.

- **Compatibility with Key Management Methods (Issuer)**: Same problem as with signing algorithms since some features rely on the type of key that is used.

---

## Signing Algorithm

The cryptographic algorithm used to create digital signatures for the credential.

### Recognition by Government Organizations

For regulated use cases, national regulation agencies provide a list of recommended and accepted cryptographic algorithms, e.g., BSI TR-2102 or NIST-published Federal Information Processing Standard (FIPS) 186-5, Digital Signature Standard (DSS). This property describes whether the designated signature algorithm is recommended by national government agencies.

- type: string
- required: false

### Hardware Support

Hardware support is required for regulated and high-security use cases to prevent key duplication and theft and with that credential replay. Existing hardware modules to sign inside smartphones are:

- Trusted Execution Environments (TEE)
- Secure Enclaves
- Secure Elements (SE)
- TPMs (Trusted Platform Modules)
- Embedded Universal Integrated Circuit Cards (eUICC)
- External authenticators

In the backend, HSMs (Hardware Security Modules) or TPMs can be used by issuers or cloud wallets to secure keys. While some specialized hardware devices support multiple advanced signature algorithms, the hardware-backed crypto processors on most common mainstream devices often support only a limited set of established signature algorithms.

Note: Hardware support availability varies—it may be supported by some HSMs but not others. The assessment indicates general availability in common hardware.

- type: boolean
- required: false

### Unlinkability / Uncorrelatability / Blind Signatures

Unlinkability is the property that an attacker cannot distinguish whether two or more items within a system are related or not. Within an identity ecosystem this applies for example:

- If one verifier can link two credentials of a holder
- If two selective disclosures of the same credential can be linked
- If two colluding verifiers can link two separate presentations of the same credential

This excludes linkability that happens by the revealed attributes themselves or unlinkability achieved by the infrastructure (e.g., just-in-time issuance). The use of unique identifiers may also impact this property.

- type: boolean
- required: false

### Security Strength

What level of security strength is common and standardized for this signing algorithm? This is important for regulated use cases, where the security strength is defined by national regulation agencies, e.g., BSI TR-2102 or NIST FIPS 186-5.

- type: string
- required: false

### Post-Quantum Security

With the computing power of quantum computers advancing, we need to think about post-quantum security. Most widely used signature algorithms are not post-quantum secure and would allow attackers—after quantum computers become computationally efficient enough—to forge credentials.

NIST has announced their choice in [post-quantum safe signature algorithms](https://csrc.nist.gov/projects/pqc-dig-sig), including SLH-DSA (Stateless Hash-Based Digital Signature Algorithm) and FN-DSA (FFT over NTRU Lattice Digital Signature Algorithm).

- type: boolean
- required: false

### Out of Scope

- **Performance**: Very difficult to measure and depends on the implementation and hardware.

---

## Key Management

Key management systems define how cryptographic keys are created, stored, resolved, rotated, and revoked for both issuers and holders.

### Infrastructure for Key Resolution

Some key management systems require an infrastructure to resolve public keys, to validate the binding of the identifier to the key, or to validate if the key got revoked. Examples of such infrastructure include:

- Witness networks
- Distributed Ledger Technologies (DLTs)
- Public Key Infrastructure (PKI)
- Web servers (e.g., did:web)
- The credential itself (embedded keys)

Note: Some systems like KERI support multiple resolution methods. This property indicates the primary infrastructure requirement.

- type: string
- required: true

### Key Rotation

It can be beneficial to rotate keys for freshness, and also to allow generating a new key pair when the old pair was compromised. This property defines whether the public key associated with an identifier can be replaced by a new one.

- type: boolean
- required: false

### Key Revocation

The possibility to revoke a key is important for security reasons. If a key is compromised, it should be possible to revoke the key and replace it with a new one. Key revocation is also useful from a business perspective, for example when a user cancels their account.

Note: This property is not explicitly in the schema but is implied by the key management capabilities.

- type: boolean
- required: false

### Key History

Even though key rotation means that no new credentials will be connected to an old key, it does not necessarily mean that credentials linked to a deprecated key are invalid. This property indicates whether a history of deprecated keys related to a certain identifier can be retained and obtained, allowing for the verification of older credentials.

- type: boolean
- required: false

### Party

The credential profile comparison matrix indicates which party (issuer versus holder) can use a certain key management system. Not all types of identifiers are desirable for both issuer and holder:

- **Issuer keys** need to be publicly verifiable and stable
- **Holder keys** only need to be used by a single credential (or a few) under a holder's control

- type: enum (issuer, holder)
- required: false

---

## Status Algorithm (Status Management)

Status algorithms define how the revocation or suspension status of credentials is managed and checked.

### Recognition by Government Organizations

Is the status algorithm recognized in regulatory frameworks of leading government bodies?

- type: string
- required: false

### Category

The algorithm behind the implementation of the status mechanism:

- **Bitlist**: Each credential has a position in a list (e.g., StatusList2021, Bitstring Status List)
- **Deny-List**: Revoked credentials are added to a list on demand
- **Accumulator**: Cryptographic proof the holder presents to show the credential is not revoked (e.g., CL Accumulator)

- type: string
- required: false

### Performance

How performant is the revocation mechanism for issuer, holder, and verifier? This includes the computational and bandwidth costs of checking and updating status.

- type: string
- required: false

### Observability

Does the verifier have the possibility to observe the revocation status beyond the presentation? This relates to privacy—whether the issuer or others can track when and where credentials are being verified.

- type: boolean
- required: false

### Traceability

Does the issuer have possibilities to trace the usage of issued credentials through the revocation mechanism? With a single-element bitlist, the issuer may always be able to trace credential usage.

- type: boolean
- required: false

### Scalability

At what scale has the algorithm/technology been demonstrated to work? Are there any known issues with large numbers of credentials?

- type: string
- required: false

### Offline Friendliness

Can the status check be performed offline or with limited connectivity? Some mechanisms require real-time connectivity to a status registry, while others support cached or embedded status proofs.

- type: boolean
- required: false

---

## Trust Management

Trust management approaches define how trust relationships between parties (issuers, verifiers, holders) are established and verified.

### Description

An explanation or link to a source describing how this trust management approach works. Examples include:

- **Trust registries**: Centralized or federated lists of trusted issuers/verifiers
- **X.509 certificate chains**: PKI-based trust hierarchies
- **DID-linked trust frameworks**: Decentralized trust based on DID documents
- **Governance frameworks**: Policy-based trust with accreditation

- type: string
- required: false

---

## Issuance Protocol

The protocol used for issuing credentials from an issuer to a holder.

### Description

Issuance protocols define the message flows and data formats for credential issuance. Examples include:

- **OpenID4VCI**: OpenID Connect-based credential issuance
- **Issue Credential (DIDComm v1/v2)**: Aries-based issuance protocol
- **ISO 23220-3**: ISO standards for mDL issuance
- **ACDC**: KERI-based credential issuance

- type: string (via Specification)
- required: false

---

## Presentation Protocol

The protocol used for presenting credentials from a holder to a verifier.

### Description

Presentation protocols define the message flows and data formats for credential presentation and verification. Examples include:

- **OpenID4VP**: OpenID Connect-based verifiable presentation
- **Present Proof (DIDComm v1/v2)**: Aries-based presentation protocol
- **ISO 18013-5 / ISO 18013-7**: ISO standards for mDL presentation (device retrieval and online presentation)
- **DIF Presentation Exchange**: Format for requesting and presenting credentials

- type: string (via Specification)
- required: false

---

## Credential Profile

A credential profile is a concrete combination of technologies that together form a complete credential ecosystem. It specifies the credential format, signing algorithm, key management, status management, issuance protocol, presentation protocol, and trust management that work together.

### Credential Profile Description

A brief description of the credential profile and its intended use case or ecosystem.

- type: string
- required: true

### Credential Format

The format of the credential (e.g., SD-JWT-VC, mDOC, AnonCreds, JWT-VC).

- type: string (reference to Credential Format)
- required: true

### Signing Algorithm

The signing algorithm used in this profile (e.g., ES256, EdDSA, BBS+).

- type: string (reference to Signing Algorithm)
- required: true

### Status Algorithm

The status/revocation mechanism used in this profile (e.g., Status List 2021, CL Accumulator).

- type: string (reference to Status Algorithm)
- required: false

### Key Management (Issuer)

The key management method for issuers in this profile (e.g., did:web, X.509, did:key).

- type: string (reference to Key Management)
- required: true

### Key Management (Holder)

The key management method for holders in this profile (e.g., did:jwk, hardware-bound keys).

- type: string (reference to Key Management)
- required: true

### Issuance Protocol

The issuance protocol used in this profile (e.g., OpenID4VCI, Issue Credential v2).

- type: string (reference to Issuance Protocol)
- required: false

### Presentation Protocol

The presentation protocol used in this profile (e.g., OpenID4VP, Present Proof v2).

- type: string (reference to Presentation Protocol)
- required: false

### Trust Management

The trust management approach used in this profile (e.g., X.509 PKI, Trust Registries).

- type: string (reference to Trust Management)
- required: false

### Formal Specification

A link to a formal specification or profile document that defines this credential profile.

- type: string (URL)
- required: false

---

## Wallet / Agent

A wallet or agent is a software application that can hold, issue, or verify credentials. It can be a mobile app, web application, or cloud service.

### Name

The name of the wallet or agent.

- type: string
- required: true

### URL Website

A URL to the website of the agent with more information.

- type: string (URL)
- required: false

### Logo

The URL to the logo of the agent.

- type: string (URL)
- required: false

### Company

The name of the company or community developing the agent.

- type: string
- required: false

### Company URL

The URL to the company website (not the product website).

- type: string (URL)
- required: false

### Contact

A link to a contact form or an email address for support requests.

- type: string
- required: false

### Open Source

Whether the agent source code is available under an open-source license.

- type: boolean
- required: false

### Download Source

The URL to the source code (e.g., GitHub repository).

- type: string (URL)
- required: false

### License

The license(s) of the agent source code.

- type: string
- required: false

### Capability

The capabilities supported by the agent.

- type: array of enum (holder, issuer, verifier)
- required: false

### Execution Environment

The place where the agent is intended to run:

- **cloud**: Server-side deployment
- **edge**: Client-side/device deployment (mobile, desktop, browser)

- type: enum (cloud, edge)
- required: false

### Portability

Whether users can export their data from the agent and import them into another device/system.

- type: boolean
- required: false

### App Store Links

Links to download the agent from app stores:
- **urlAppStore**: Link to the Apple App Store
- **urlGooglePlayStore**: Link to the Google Play Store
- **urlWebApp**: Link to the web app

- type: string (URL)
- required: false

### Supported Technologies

Lists of technologies supported by the wallet:

- **dependencies**: Software libraries/frameworks the wallet is built on
- **credentialProfiles**: Supported credential profiles
- **credentialFormats**: Supported credential formats
- **signingAlgorithms**: Supported signing algorithms
- **statusManagements**: Supported status management methods
- **keyManagements**: Supported key management methods
- **issuanceProtocols**: Supported issuance protocols
- **presentationProtocols**: Supported presentation protocols
- **trustManagements**: Supported trust management methods

- type: array of strings (references to respective entities)
- required: false

---

## Dependency

A dependency is a software library, SDK, or framework that wallets and agents can build upon.

### Name

A unique name of the dependency.

- type: string
- required: true

### URL

A link to the dependency, ideally to the GitHub repository to fetch the latest version.

- type: string (URL)
- required: true

### Description

A short description of the dependency and its purpose.

- type: string
- required: false

### License

The license of the dependency (e.g., Apache-2.0, MIT).

- type: string
- required: false

### Language

The programming language of the dependency (e.g., TypeScript, Kotlin, Rust).

- type: string
- required: true

### Community

A link to interact with the community of the dependency (e.g., Slack, Discord, forum).

- type: string (URL)
- required: false

---

## Case Study

A case study documents real-world deployments of verifiable credential technology, linking to the wallets and agents used.

### References

The names of the wallets or agents to link to. These must match with the name of existing wallet/agent entries.

- type: array of strings
- required: true

### Created At

The date the case study was added.

- type: string (date format: YYYY-MM-DD)
- required: true

### Stage

The stage of the case study deployment:

- **poc**: Proof of concept or pilot
- **production**: Live production deployment
- **retired**: No longer active

- type: enum (poc, production, retired)
- required: true

### Headline

Name of the case study (max 60 characters).

- type: string
- required: true

### Summary

Short summary of the case study (max 1000 characters).

- type: string
- required: true

### Image URL

URL to a representative image for the case study.

- type: string (URL)
- required: true

### URL

URL to more information about the case study.

- type: string (URL)
- required: true

### Hash Tags

List of relevant hash tags for categorization and discovery.

- type: array of strings
- required: true

### Stakeholders

List of stakeholders involved in the case study:
- **name**: Name of the stakeholder (required)
- **contact**: Contact information (optional)

- type: array of objects
- required: false
