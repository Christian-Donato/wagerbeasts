# Contributing to WagerBeasts

Thank you for your interest in contributing to WagerBeasts! We welcome contributions from the community and are grateful for your help in making this project better.

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 15 or higher
- Git
- Docker (optional, for local development)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/wagerbeasts.git
   cd wagerbeasts
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up the database**:
   ```bash
   # Create a local PostgreSQL database
   createdb wagerbeasts_dev

   # Run database migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

7. **Run tests** to ensure everything is working:
   ```bash
   npm test
   ```

## Development Workflow

### Branching Strategy
We use a GitFlow-inspired branching strategy:

- `main`: Production-ready code
- `develop`: Latest development changes
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Write tests** for your changes

4. **Run the test suite**:
   ```bash
   npm test
   npm run test:e2e  # for end-to-end tests
   ```

5. **Update documentation** if needed

6. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** on GitHub

### Commit Message Convention
We follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/modifications
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add OAuth2 login support
fix(game): resolve blackjack calculation bug
docs(api): update authentication endpoint docs
```

## Code Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Maximum line length: 100 characters
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components
- Use functional components with hooks
- Follow component naming conventions (PascalCase)
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow accessibility guidelines (WCAG 2.1)

### API Design
- Follow RESTful conventions
- Use consistent HTTP status codes
- Implement proper error handling
- Version APIs appropriately
- Document all endpoints

### Database
- Use Prisma for database operations
- Follow naming conventions for tables and columns
- Implement proper indexes
- Use transactions for multi-step operations
- Validate data integrity

## Testing

### Unit Tests
- Write unit tests for all business logic
- Aim for 80%+ code coverage
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

### Integration Tests
- Test API endpoints thoroughly
- Test database operations
- Test external service integrations
- Use test databases for integration tests

### End-to-End Tests
- Test complete user workflows
- Test critical user journeys
- Run E2E tests in CI/CD pipeline
- Update tests when UI changes

## Pull Request Process

### Before Submitting
- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Code is reviewed by yourself
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with develop

### PR Template
Please fill out the PR template with:
- Description of changes
- Type of change (bug fix, feature, etc.)
- Testing instructions
- Screenshots (if UI changes)
- Related issues

### Review Process
1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: At least one maintainer reviews the code
3. **Approval**: PR approved by reviewer
4. **Merge**: Squash merge to develop branch
5. **Deployment**: Automatic deployment to staging

### Review Guidelines
- Be constructive and respectful
- Focus on code quality and maintainability
- Suggest improvements, don't demand changes
- Approve PRs that meet standards
- Request changes for significant issues

## Reporting Issues

### Bug Reports
When reporting bugs, please include:
- Clear title describing the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, etc.)
- Screenshots or error messages
- Related code or logs

### Feature Requests
For feature requests, please include:
- Clear description of the proposed feature
- Use case and benefits
- Mockups or examples if applicable
- Related issues or discussions

### Security Issues
- **DO NOT** report security vulnerabilities publicly
- Email security@wagerbeasts.com with details
- Include steps to reproduce and potential impact
- We follow responsible disclosure practices

## Documentation

### Code Documentation
- Add JSDoc comments for public functions
- Document complex algorithms
- Update API documentation for changes
- Keep README and docs up to date

### User Documentation
- Update user-facing documentation
- Add screenshots for UI changes
- Document new features clearly
- Maintain troubleshooting guides

## Community

### Communication
- Use GitHub Issues for bugs and features
- Use GitHub Discussions for general questions
- Join our Discord/Slack for real-time chat
- Follow our Code of Conduct

### Recognition
- Contributors are recognized in release notes
- Significant contributions may be highlighted
- Top contributors may be invited to join the core team

## License

By contributing to WagerBeasts, you agree that your contributions will be licensed under the same license as the project.

## Getting Help

- **Documentation**: Check our docs first
- **Issues**: Search existing issues
- **Discussions**: Ask the community
- **Contact**: Reach out to maintainers

Thank you for contributing to WagerBeasts! Your help makes this project better for everyone.