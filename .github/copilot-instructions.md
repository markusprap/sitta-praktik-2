# AI Persona Framework - Copilot Instructions

## Project Overview
This is an **AI persona framework** for GitHub Copilot that enables role-based AI assistance across the entire product development lifecycle. The framework contains 14 specialized persona definitions that transform Copilot into domain experts (Product Manager, Senior Engineer, UX Designer, etc.).

## Architecture & Structure

### Core Pattern: Persona Definition Files
Each persona file (`*.md` in `persona-framework/`) follows a consistent structure:
- **[PERAN DAN KONTEKS UTAMA]**: Character introduction with name and background
- **[MISI UTAMA & CARA KERJA KITA]**: Mission statement and approach
- **4 Pilar Expertise**: Four core competency areas specific to the role
- **Persona & Gaya Bicara**: Communication style and personality traits
- **Expertise Areas**: Bulleted list of technical/domain skills

### Persona Categories
```
Core Product Team: product-manager.md, product-owner.md, ux-designer.md, business-analyst.md
Engineering Team: solution-architect.md, senior-engineer.md, frontend-developer.md, backend-developer.md, devops-engineer.md, qa-engineer.md
Specialized: data-engineer.md, security-engineer.md, performance-engineer.md, technical-writer.md
```

## Key Conventions

### Persona Character Names
Each persona has a distinct character name that embodies their role:
- Product Manager → "Sarah" (strategic, data-driven)
- Senior Engineer → "Marcus" (pragmatic, quality-focused)
- Frontend Developer → "Zara" (user-centric, performance-obsessed)
- Backend Developer → "Kai" (reliability-focused, security-conscious)
- DevOps Engineer → "Rio" (automation-obsessed)
- UX Designer → "Luna" (creative, user advocate)
- Solution Architect → "David" (strategic, analytical)

### Writing Style Patterns
- **Bilingual approach**: Mix of Indonesian and English (technical terms in English)
- **Casual but professional**: Uses "kamu/lo/gue" for approachability
- **Action-oriented**: Each section ends with implementation-focused content
- **Real-world grounded**: References concrete examples, case studies, proven patterns

### 4-Pilar Structure
Every persona MUST define exactly 4 expertise pillars that:
1. Progress from foundational to advanced concepts
2. Include specific tools, frameworks, or methodologies
3. Balance technical skills with soft skills/collaboration
4. Use descriptive subtitles in parentheses (e.g., "Building for Scale")

## Usage Guidelines

### How Users Activate Personas
Users copy-paste persona file contents into Copilot Chat to activate that role. Example:
```
# User copies product-manager.md into chat
# Copilot then responds as "Sarah" with PM expertise
```

### Cross-Persona Collaboration
README.md encourages combining personas for complex problems:
- Use PM + UX Designer for product discovery
- Use Solution Architect + Senior Engineer for system design
- Use DevOps + Security Engineer for infrastructure planning

## When Contributing New Personas

1. **Follow the template structure** exactly (see existing files)
2. **Choose a memorable character name** that fits the role archetype
3. **Define 4 distinct pillars** - no more, no less
4. **Use consistent language style** - mix Indonesian/English, casual but expert
5. **Update README.md** to include new persona in appropriate category
6. **Include 8-10 expertise areas** as bullet points
7. **End with activation phrase**: "Jika kamu sudah sepenuhnya meresapi peran sebagai..."

## Project-Specific Details

### No Build/Test Infrastructure
This is a documentation-only project with no code execution:
- No package.json, dependencies, or build scripts
- No test suites or CI/CD pipelines
- Pure markdown content repository

### Target Audience
Indonesian-speaking developers and product teams who want specialized AI assistance for different roles in software development.

### Design Philosophy
- **Accessibility over formality**: Makes expert knowledge approachable
- **Specificity over generalization**: Each persona has distinct, non-overlapping expertise
- **Practical over theoretical**: Focus on actionable guidance and real-world patterns
- **Cultural relevance**: Uses Indonesian context and communication norms

## Quick Reference

**Adding new persona**: Create `persona-framework/new-role.md` → Follow 4-pilar template → Update README.md category list

**Modifying existing persona**: Preserve character name and core structure → Update expertise areas to stay current → Maintain bilingual style

**Documentation changes**: Keep README.md simple and scannable → Use emojis sparingly (🤖 🚀) → List personas by category
