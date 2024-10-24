# Structure

This document defines the different objects, how they are structured and how they rely on each other.

Each value included a definition, the type of field and if it is required or not. We will only set a field as required when we think it is essential to be be listed in the matrix. If a field is not required, it means it's extra info that _SHOULD_ be added as soon as possible.

## Core-Values

These values are supported by all the different objects.

### Identifier

unique identifier for the credential format. It case there are multiple versions of the same format, the version should be added to the identifier in case there are differences between the versions that are not backwards compatible or have impact on the features the format is able to support.

- type: string
- required: true

### IPR Policy

Information on the status of patents and knowledge of possible IP rights are important for the adoption of new technologies.
The document lists the known status of existing or expired patents or links to the IPR Policies that were in effect for the
creation of standards and specifications. However, the existence of IPR policies does not guarantee the non-existence of
patents from parties that were not involved in the process.

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

### Implementation support

For developers it is important to know to what extent the technology has been implemented. Therefore information is provided on which or how many software libraries are available.

- type: Array of links
- required: false

out of scope:

- technology readiness level: it is very difficult to define a technology readiness level for a technology that is not yet standardized. The technology readiness level is also not a good indicator for the maturity of a technology. It is possible to have a technology that is very mature, but not yet standardized. It is also possible to have a technology that is standardized, but not yet mature.

## Credential format

The format that is used to store the credential. This normally involves a format combining the claim and the signature to one object to define a credential.

### Selective Disclosure

Selective disclosure allows a holder to present a subset of the attributes of the credential issued by the issuer. This minimizes the amount of the holder's information that is shared with the issuer. For example, the government issues a passport credential to Alice. The passport includes a variety of attributes, such as Alice's first name, last name, birthday, social security number, et cetera. When Alice want to buy alcohol at the supermarket, she has to prove to the supermarket that she is of legal drinking age ($18+$) to buy alcohol. In the classical setting where Alice shows her passport to the supermarket, the supermarket sees all the attributes on her passport, even though they just need her birthday. Using a credential format's selective disclosure capabilities, she can simply present her birthday, with which the supermarket can verify that she is over $18$.

Selective disclosure can be achieved through the use of a signature algorithm that supports selective disclosure, such as BBS+ or CL signatures, or by using a salted hash approach in the credential format's design. In the latter case, the salted hashes of the claims that can potentially be selectively disclosed are signed by the credential issuer (not the claims itself). The holder will then present the credential containing the signed hashes along with the actual claim values she wants to disclose and the verifier needs to check whether the disclosed values produce the same hash (i.e. are the values asserted by the credential issuer).

Selective disclosure can also be achieved through governance, namely a community can agree on signing each attribute separately, such that each attribute can also be presented separately. As mentioned before, in our matrix we only look at choices at the credential profile level, hence we only look at whether selective disclosure is achieved through the signature algorithm.

- required: false
- type: boolean

### Predicates

Predicates allow the holder to further decrease the amount of information shared with the holder. Predicates check a value against a certain condition, resulting in true or false. Recall the example of Alice wanting to buy alcohol in the supermarket. Alice can prove that she is older than 18 using the predicate _age_ $\geq 18$. As Alice's age is $20$, the predicate $20 \geq 18$ is true. This way Alice can prove that she is allowed to buy alcohol without revealing her birthday or even her age.

Just like selective disclosure, predicates can be created on various levels. On a governance level, the issuer could issue common predicates to holders, such as $18+$ and $65+$. In the matrix, we only consider predicates through the capability of performing Zero-Knowledge Proofs in the credential profile.

More information about predicates and zero-Knowledge-Proofs can be found [here](https://medium.com/51nodes/selectively-disclosed-verifiable-credentials-79a236b81ee2).

- required: false
- type: boolean

### Crypto Agility

To support long term security the cryptographic algorithms that are used for encrypting, signing, and hashing should be updatable without losing features. Crypto agility could mean

- to increase the amount of bits for the keys
- to replace the algorithm with a new one

It is difficult to predict the time when an algorithm has to be updated. Typical scenarios are:

- the algorithm is broken and security is suddenly lost
- the amount of computation power is high enough to perform a brute force attack in an acceptable amount of time
- there are faster algorithms that make the process more efficient without losing features or lowering the security level

A relevant source is the recommendation of the German BSI (Federal Office for Information Security). They have published a [technical guideline for recommendations and key lengths](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TG02102/BSI-TR-02102-1.pdf?__blob=publicationFile&v=4) listing the algorithms and parameters to use. It must be mentioned that this is only a recommendation and not a direct law.

required: false
type: boolean

### Encoding Scheme

There are various ways to encode the information within the credential, such as JSON, CBOR, Go Structs, etc.
TODO: define the impact on the format like size, etc.

- required: false
- type: string[]

### Rich Schemas / Semantics

Rich schemas are hierarchically composable graph-based representations of complex data.

- required: false
- type: boolean

### Out of scope:

#Compatibility with Signing Algorithms

What signing algorithms can the format be combined with?

This is difficult to set since some features rely on specific signing algorithms. For example, selective disclosure relies on BBS+ signatures. But you can use VC also with other signing algorithms, then selective disclosure is not supported. In case of SD-JWT, the selective disclosure algorithm is independent of the signing algorithm. In case of anoncreds v1 you can only use one signing algorithm, and since it supports selective disclosure, it is supported for all possible signing algorithms for anoncreds.

#Compatibility with Key Management Methods (Issuer)

same problem as with signing algorithms since some features rely on the type of key that is used. Therefore it should be removed.

## Signature algorithm

### Recognition by Government Organizations

For regulated use cases, the national regulation agencies provide a list of recommended and accepted cryptographic algorithms, e.g. BSI TR-2102 or NIST-published Federal Information Processing Standard (FIPS) 186-5, Digital Signature Standard (DSS). This property describes whether the designated signature algorithm is recommended by national government agencies.

- required: false
- type: string

### Hardware support

Hardware support is required for regulated and high-security use cases to prevent key duplication and theft and with that credential replay. Existing hardware modules to sign inside the smartphones are Trusted Execution Environments (TEE), Secure Enclaves, Secure Elements (SE), TPMs (Trusted Platform Modules), Embedded Universal Integrated Circuit Cards (eUICC), external authenticators, and more. In the backend, HSMs (Hardware Security Modules) or TPMs (Trusted Platform Modules) can be used by issuers or cloud wallets to secure the keys. While some specialised hardware devices support multiple advanced signature algoritms, the hardware-backed crypto processors on most common mainstream devices often support only a limited set of established signature algorithms. Therefore, the use of modern cryptography algorithms is limited for these use cases.

TODO: it is difficult to define when hardware support is available: if one HSM is supporting it, if 51% on the market are supporting it or if 100% are supporting it.

required: false
type: boolean (but in many cases the people need more information which devices, like iphone, etc. It's a very subjective field)

### Unlinkability-Uncorrelatability-Blind signatures possible

Unlinkability is the property that an attacker cannot distinguish whether two or more items within a system (comprising these and possibly other items) are related or not. Within an identity ecosystem this applies for example if one verifier can link two credentials of a holder or two selective disclosures of the same credential or whether two colluding verifiers can link two separate presentations of the same credential. This excludes the fact that linkability can also happen by the revealed attributes themselves or that unlinkability can be achieved by the infrastructure, e.g. just-in-time issuance.

TODO: need to check if the usage of unique identifiers has to do with this property.

- required: false
- type: boolean

### Security strength

What level of security strength is common and standardized for this signing algorithm? This is important for regulated use cases, where the security strength is defined by the national regulation agencies, e.g. BSI TR-2102 or NIST-published Federal Information Processing Standard (FIPS) 186-5, Digital Signature Standard (DSS).

- required: false
- type: string

### Post quantum security

With the computing power of quantum computers advancing, we need to think about post-quantum security with regard to SSI. Most widely used signature algorithms are not post-quantum secure and allow attackers after quantum computers have become computationally efficient enough to issue themselves credentials like they are issued right now by a recognized entity. So Eve can issue herself a university degree years from now, making it look like the credential was issued in 2022 by her university, as she can easily create the signature using a quantum computer.

NIST has recently announced their choice in [post-quantum safe signature algorithms](https://csrc.nist.gov/projects/pqc-dig-sig)

- required: false
- type: boolean

### Out of scope

Performance: very difficult to measure and depends on the implementation.

## Key Management (Issuer)

### Infrastructure for Key Resolution

Some key management systems require an infrastructure to resolve public keys, to validate the binding of the identifier to the key or to validate if the key got revoked. Examples of such an infrastructure are witness networks, DLTs, PKIs, or web servers.

TODO: is there a use-case where a public key is already embedded in the credential so you do not need an infrastructure to resolve the key? What is with cases like key revocation?

TODO: is PKI a type or an implementation for an infrastructure relying on web servers?

TODO: in case of KERI, there are multiple ways to resolve a key. It could either be a web server or a DLT. How to handle this?

- type: string or enum
- required: true

### Key Rotation

It can be beneficial to rotate keys every once in a while for freshness, but also allowing for generating a new key pair for when the old pair was compromised. This property defines whether the public key in a credential can be replaced by a new one.

- type: boolean
- required: false

### Key Revocation

The possibility to revoke a key is important for security reasons. If a key is compromised, it should be possible to revoke the key and replace it with a new one. This property defines whether a key can be revoked. Also from a business perspective it can be interesting to revoke a key, for example the user is cancelling the account and the key should not be used anymore.

- type: boolean
- required: false

### Key History

Even though key rotation means that no new credentials will be connected to that key, it does not necessarily mean that the credentials linked to a deprecated key are invalid. This property is about whether a history of deprecated keys related to a certain identifier can be retained and obtained, allowing for the verification of older credentials.

- type: boolean
- required: false

### Party

The credential profile comparison matrix also indicates which party (issuer versus holder) can use a certain key management system. Not all types of identifiers are desirable to use for both issuer and holder. Issuer keys need to be publicly verifiable and stable, whereas a key for holder binding only needs to be used by a single credential (or a couple of them) under a certain holder’s control.

- type: enum (verifier, issuer)
- required: false
