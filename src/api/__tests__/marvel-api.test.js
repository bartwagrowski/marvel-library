import { getMarvelCharacters, getCharacterDetails } from '../marvel-api';
import { API_PRIVATE_KEY, API_PUBLIC_KEY } from '../../constants';
import md5 from 'md5';

jest.mock('md5', () => jest.fn(() => 'MD5IED'));

describe('Marvel API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2020, 3, 1));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('getMarvelCharacters', () => {
        it('should return the data correctly', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: jest.fn(() =>
                    Promise.resolve({
                        foobar: 'barfoo',
                    })
                ),
            });

            const result = await getMarvelCharacters([{ param: 'foo', value: 'bar' }]);
            expect(result).toEqual({
                foobar: 'barfoo',
            });
            expect(fetch).toBeCalledWith(`http://gateway.marvel.com/v1/public/characters?&foo=bar&ts=1585695600000&apikey=${API_PUBLIC_KEY}&hash=MD5IED`);
            expect(md5).toBeCalledWith(`1585695600000${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
        });

        it('should throw an error if the call fails', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: false,
                json: jest.fn(() =>
                    Promise.resolve({
                        status: 'Oh no!',
                    })
                ),
            });

            await expect(async () => {
                await getMarvelCharacters([{ param: 'foo', value: 'bar' }]);
            }).rejects.toThrow('Oh no!');
            expect(fetch).toBeCalledWith(`http://gateway.marvel.com/v1/public/characters?&foo=bar&ts=1585695600000&apikey=${API_PUBLIC_KEY}&hash=MD5IED`);
            expect(md5).toBeCalledWith(`1585695600000${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
        });
    });

    describe('getCharacterDetails', () => {
        it('should return the data correctly', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: jest.fn(() =>
                    Promise.resolve({
                        foobar: 'barfoo',
                    })
                ),
            });

            const result = await getCharacterDetails('12345');
            expect(result).toEqual({
                foobar: 'barfoo',
            });
            expect(fetch).toBeCalledWith(`http://gateway.marvel.com/v1/public/characters/12345?&ts=1585695600000&apikey=${API_PUBLIC_KEY}&hash=MD5IED`);
            expect(md5).toBeCalledWith(`1585695600000${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
        });

        it('should throw an error if the call fails', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: false,
                json: jest.fn(() =>
                    Promise.resolve({
                        status: 'Oh no!',
                    })
                ),
            });

            await expect(async () => {
                await getCharacterDetails('12345');
            }).rejects.toThrow('Oh no!');
            expect(fetch).toBeCalledWith(`http://gateway.marvel.com/v1/public/characters/12345?&ts=1585695600000&apikey=${API_PUBLIC_KEY}&hash=MD5IED`);
            expect(md5).toBeCalledWith(`1585695600000${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
        });
    });
});
