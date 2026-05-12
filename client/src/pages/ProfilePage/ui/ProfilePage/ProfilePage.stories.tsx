import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';
import { profileReducer } from '@/entities/Profile';
import { quizReducer } from '@/entities/Quiz';
import ProfilePage from './ProfilePage';

const authUser = {
    id: '1',
    username: 'azamat',
    email: 'root@mail.ru',
    token: 'token_admin',
    createdAt: '12.10.2023',
};

const mockProfile = {
    id: '1',
    firstName: 'Азамат',
    lastName: 'Каримов',
    avatarUrl: '',
    createdAt: '12.10.2023',
};

const mockProfileWithAvatar = {
    ...mockProfile,
    avatarUrl: 'https://avatars.mds.yandex.net/i?id=173df4e04c7b771f188bb66f67851589-5652956-images-thumbs&n=13',
};

const mockQuizzes = [
    { id: '1', title: 'UX/UI Best Practices', description: '', authorId: '1', isPublished: true, createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), attemptsCount: 1240, questionsCount: 5 },
    { id: '2', title: 'Figma Shortcuts', description: '', authorId: '1', isPublished: false, createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), attemptsCount: 389, questionsCount: 12 },
    { id: '3', title: 'TypeScript Advanced', description: '', authorId: '1', isPublished: true, createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), attemptsCount: 5600, questionsCount: 30 },
    { id: '4', title: 'React Performance', description: '', authorId: '1', isPublished: true, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), attemptsCount: 820, questionsCount: 18 },
];

const meta = {
    title: 'Pages/ProfilePage',
    component: ProfilePage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [TooltipDecorator],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    decorators: [StoreDecorator(
        {
            user: { authData: authUser, _inited: true },
            profile: { data: undefined, isLoading: true } as never,
            quizzes: { quizzes: [], isLoading: false, currentQuizIsLoading: false } as never,
        },
        { profile: profileReducer, quizzes: quizReducer },
    )],
};

export const WithInitials: Story = {
    decorators: [StoreDecorator(
        {
            user: { authData: authUser, _inited: true },
            profile: { data: mockProfile, isLoading: false, createdAt: '12.10.2023' } as never,
            quizzes: { quizzes: mockQuizzes, isLoading: false, currentQuizIsLoading: false } as never,
        },
        { profile: profileReducer, quizzes: quizReducer },
    )],
};

export const WithAvatar: Story = {
    decorators: [StoreDecorator(
        {
            user: { authData: authUser, _inited: true },
            profile: { data: mockProfileWithAvatar, isLoading: false, createdAt: '12.10.2023' } as never,
            quizzes: { quizzes: mockQuizzes, isLoading: false, currentQuizIsLoading: false } as never,
        },
        { profile: profileReducer, quizzes: quizReducer },
    )],
};

export const NoQuizzes: Story = {
    decorators: [StoreDecorator(
        {
            user: { authData: authUser, _inited: true },
            profile: { data: mockProfile, isLoading: false, createdAt: '12.10.2023' } as never,
            quizzes: { quizzes: [], isLoading: false, currentQuizIsLoading: false } as never,
        },
        { profile: profileReducer, quizzes: quizReducer },
    )],
};

export const ActiveUser: Story = {
    decorators: [StoreDecorator(
        {
            user: { authData: authUser, _inited: true },
            profile: { data: mockProfile, isLoading: false, createdAt: '12.10.2023' } as never,
            quizzes: {
                quizzes: Array.from({ length: 12 }, (_, i) => ({
                    id: String(i + 1),
                    title: `Тест ${i + 1}`,
                    description: '',
                    authorId: '1',
                    isPublished: i % 3 !== 0,
                    createdAt: new Date(Date.now() - i * 3 * 86400000).toISOString(),
                    attemptsCount: (i + 1) * 150,
                    questionsCount: (i + 1) * 3,
                })),
                isLoading: false,
                currentQuizIsLoading: false,
            } as never,
        },
        { profile: profileReducer, quizzes: quizReducer },
    )],
};
