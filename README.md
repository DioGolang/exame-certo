# Exame Certo - Centralização de Exames e Informações Médicas

## Visão Geral

Exame Certo é uma aplicação web desenvolvida para centralizar exames laboratoriais e informações médicas de pacientes, facilitando o acesso e a análise de dados de saúde ao longo do tempo. A aplicação oferece uma plataforma segura e eficiente onde pacientes podem armazenar, organizar e compartilhar seus dados clínicos com profissionais de saúde.

Este projeto adota uma arquitetura sólida e escalável baseada nos seguintes princípios e padrões de design:

### Clean Architecture

A arquitetura limpa, ou Clean Architecture, é utilizada para manter uma separação clara entre as diferentes camadas da aplicação. Isso promove a independência de frameworks, UI, banco de dados e qualquer outra dependência externa, garantindo que as regras de negócio permaneçam isoladas e facilmente testáveis.

### Domain-Driven Design (DDD)

dotamos o Domain-Driven Design (DDD) para focar na modelagem do domínio de forma a refletir com precisão o mundo real. DDD nos ajuda a capturar a complexidade do negócio em um modelo de software que seja compreensível e flexível. As entidades, agregados, repositórios e serviços são modelados para expressar claramente as regras e lógica de negócio.

### Princípios SOLID
Os princípios SOLID são seguidos rigorosamente para garantir que o código seja robusto, flexível e de fácil manutenção:

- S - Single Responsibility Principle (SRP): Cada classe ou módulo tem uma única responsabilidade.
- O - Open/Closed Principle (OCP): O código é aberto para extensão, mas fechado para modificação.
- L - Liskov Substitution Principle (LSP): Subtipos devem ser substituíveis por seus tipos base sem alterar a corretude do programa.
- I - Interface Segregation Principle (ISP): Módulos não devem ser forçados a depender de interfaces que não utilizam.
- D - Dependency Inversion Principle (DIP): Abstrações não devem depender de detalhes, e sim o contrário.

 ## Padrões de Design Aplicados

1. **Repository Pattern:**
   - Para abstrair a lógica de persistência de dados e permitir a troca de tecnologias de armazenamento sem impacto no domínio.

2. **Factory Pattern:**
   - Para criar instâncias complexas de objetos de domínio com dependências.

3. **Service Layer:**
   - Para encapsular a lógica de aplicação, mantendo a camada de domínio limpa e focada.

4. **Event-Driven Architecture:**
   - Para processar eventos de webhooks e sincronização de dados de forma desacoplada e assíncrona.
---

### Desafios Identificados

1. **Padrões de Interoperabilidade:** HL7, FHIR, DICOM.
2. **Certificação Digital:** Implementação de certificação digital.
3. **ETL:** Processos de ETL para integração com EHRs.
4. **Webhooks:** Recepção de notificações em tempo real.
5. **Segurança e Privacidade dos Dados:** Criptografia e autenticação multifator (MFA).
6. **Digitalização e Armazenamento de Laudos:** OCR.
7. **Autenticação e Segurança:** JWT, OAuth2.
8. **Processamento Assíncrono:** Gerenciamento de tarefas assíncronas.

## Requirements

---

### *Must Have*

* Centralização dos Exames, Interoperabilidade, Certificação Digital, Segurança e Privacidade, Processamento Assíncrono.

### *Should Have*

* Digitalização e OCR, Webhooks, Interface Gráfica.

### *Could Have*

* Integração com Nuvem, Automação de ETL, Notificações Inteligentes.

### *Won't Have*

* Prontuário Eletrônico Completo.

## Method

### Arquitetura Geral

O sistema será desenvolvido usando os princípios do **Domain-Driven Design (DDD)** e **Clean Architecture** para garantir modularidade, manutenibilidade e escalabilidade.

##  Camadas da Arquitetura

1. **Camada de Domínio:**
   - Contém as regras de negócio e lógicas fundamentais do sistema.
   - Modelos de Domínio: Entidades como `Patient`, `Anamnesis`, `Report`, `Exam`, `Doctor`, `Clinic`, que encapsulam comportamentos específicos.
   - Usaremos o conceito de **Aggregates** para gerenciar grupos de entidades que mudam de forma coesa.

2. **Camada de Aplicação:**
   - Orquestra as interações entre o domínio e as camadas externas.
   - **Use Cases**: Casos de uso específicos como `ArmazenarExame`, `ConsultarHistorico`, que representam a lógica da aplicação.
   - Implementação de serviços e interfaces para mediar entre o domínio e as camadas de infraestrutura.

3. **Camada de Infraestrutura:**
   - Inclui frameworks, bibliotecas, e componentes de infraestrutura.
   - Repositórios que implementam interfaces da camada de aplicação, por exemplo, para persistência no banco de dados.
   - Integração com APIs externas, como EHRs usando HL7/FHIR, e serviços de certificação digital.
   - Processos de ETL e gestão de webhooks para sincronização de dados.

4. **Camada de Interface de Usuário (UI):**
   - Implementada usando Next.js para fornecer uma interface responsiva e interativa.
   - Páginas e componentes React.js que se comunicam com a API desenvolvida em NestJS.
   - Representação gráfica dos dados (gráficos de evolução) usando bibliotecas como Chart.js ou D3.js.

## Fluxo de Dados

1. **Entrada de Dados:**
   - Dados de exames e anamnese são capturados via formulários e upload de documentos na interface Next.js.
   - Documentos digitalizados passam por OCR na camada de Infraestrutura para conversão em texto.

2. **Processamento e Persistência:**
   - O domínio processa as informações recebidas, aplicando regras de negócio, e solicita a camada de Infraestrutura para persistir dados em repositórios adequados.
   - Dados críticos, como exames, são armazenados em um banco de dados seguro com criptografia.
   - Processos assíncronos lidam com a carga de documentos digitalizados e integrações via ETL.

3. **Interoperabilidade:**
   - Integrações com sistemas de EHR são realizadas via APIs RESTful utilizando HL7 e FHIR.
   - Webhooks são configurados para receber notificações em tempo real de novos registros ou atualizações em sistemas externos.

4. **Autenticação e Autorização:**
   - A autenticação é gerida com JWT ou OAuth2, garantindo que apenas usuários autenticados e autorizados acessem os dados.
   - Certificação digital é usada para garantir a autenticidade nas interações com EHRs.

---

## Relacionamentos Atualizados

### Estrutura das Entidades com Tenant Discriminator

- PatientEntity
- DoctorEntity
- ClinicEntity
- AnamnesisEntity
- ExamEntity
- ReportEntity

Cada entidade relevante terá um campo tenant_id para garantir o isolamento dos dados por clínica.

1. PatientEntity
- Um paciente pode estar associado a várias clínicas. O campo *tenant_id* é usado para garantir que as associações de um paciente sejam isoladas por clínica.

2. DoctorEntity
- Um médico pode estar associado a várias clínicas e atender vários pacientes. O tenant_id garante que os dados sejam filtrados por clínica.

3. ClinicEntity
- A clínica é o tenant no sistema, com muitos médicos e pacientes associados. As operações de leitura e gravação são isoladas por tenant_id.

4. AnamnesisEntity
- A anamnese pertence a um paciente e a um médico, ambos associados ao mesmo tenant (clínica). Isso garante que a anamnese seja isolada por clínica. 

5. ExamEntity
- Um exame pertence a um paciente, a um médico e a uma clínica, todos associados ao mesmo tenant (clínica).

6. ReportEntity
- Um laudo (report) é associado a um exame e a um médico, garantindo que o tenant_id seja consistente com a clínica em questão.


### Explicação dos Relacionamentos e Isolamento por Tenant

1. Tenant Context: 
- Cada clínica (tenant) tem seu próprio tenant_id. Todas as operações de leitura e gravação são filtradas por esse tenant_id, garantindo que os dados sejam isolados por clínica.

2. Shared Database: 
- Todas as clínicas compartilham o mesmo banco de dados físico, mas os dados são logicamente separados pelo tenant_id, o que simplifica o gerenciamento e a escalabilidade.

3. Bounded Contexts:

- Gestão de Pacientes: O PatientEntity é o Aggregate Root no contexto de "Gestão de Pacientes".
- Gestão de Médicos: O DoctorEntity é o Aggregate Root no contexto de "Gestão de Médicos".

Esses contextos são isolados e interagem de forma controlada, utilizando o tenant_id para garantir que as interações entre pacientes e médicos sejam filtradas corretamente.

4. Service Layer e Tenant Filtering:

- Todas as operações realizadas pela camada de serviço devem sempre passar o tenant_id para garantir que apenas os dados da clínica atual sejam acessados ou manipulados.

5. Tabelas de Junção e Chaves Estrangeiras:

- Tabela de Junção: Relacionamentos muitos-para-muitos, como entre médicos e clínicas, são modelados com tabelas de junção (doctor_clinics, patient_clinics).
- Chaves Estrangeiras: As chaves estrangeiras garantem a integridade referencial e asseguram que os dados estejam corretamente associados ao tenant_id.


### Relacionamentos entre as entidades por tenant_id

- PatientEntity: Um paciente pode estar associado a várias clínicas (ManyToMany), e cada associação tem um tenant_id específico. Isso garante que o paciente possa existir em diferentes clínicas com registros distintos para cada uma.

- DoctorEntity: Um médico pode estar associado a várias clínicas (ManyToMany), e o tenant_id identifica a clínica específica para cada associação.

- ClinicEntity: A clínica possui muitos médicos e pacientes associados (ManyToMany), e o tenant_id é usado para garantir que as operações de leitura e gravação sejam isoladas por clínica.

- AnamnesisEntity: Uma anamnese pertence a um paciente e a um médico, ambos com o mesmo tenant_id, garantindo que a anamnese seja isolada para uma clínica específica.

- ExamEntity: Um exame pertence a um paciente, a um médico, e a uma clínica. O tenant_id assegura que o exame seja associado corretamente à clínica correspondente.


---

## Tecnologias Utilizadas

1. **NestJS:**
   - Backend modular e extensível.
   - Suporte para arquitetura limpa e orientação a DDD.
   - Implementação de serviços RESTful para comunicação com o frontend e sistemas externos.

2. **Next.js:**
   - Framework React.js para renderização do frontend.
   - SSR (Server-Side Rendering) para melhorar SEO e tempos de carregamento.

3. **Banco de Dados:**
   - Banco de dados relacional como PostgreSQL para armazenar dados estruturados.
   - Implementação de criptografia em repouso para dados sensíveis.

4. **OCR:**
   - Biblioteca Tesseract.js para OCR e conversão de laudos em texto pesquisável.

5. **Keycloak**
- Keycloak fornece uma solução completa para autenticação, gerenciamento de usuários e controle de acesso.

6. **JWT**
- Os tokens JWT permitem autenticação sem estado e escalável, com a capacidade de incluir informações de controle de acesso.

6. **Chart.js/D3.js:**
   - Utilizadas para a geração de gráficos de evolução dos exames na interface de usuário.






