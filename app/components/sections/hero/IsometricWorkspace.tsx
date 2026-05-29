import './IsometricWorkspace.css';

const trapCount = 49;

export function IsometricWorkspace() {
  return (
    <div className='isometric-scene' aria-label='Interactive portfolio preview'>
      <div className='isometric-grid' aria-hidden='true'>
        {Array.from({ length: trapCount }).map((_, index) => (
          <span className='isometric-trap' key={index} />
        ))}
      </div>

      <div className='isometric-card'>
        <div className='isometric-text'>
          <div className='isometric-code-window'>
            <div className='isometric-code-header' aria-hidden='true'>
              <span className='isometric-code-dot' />
              <span className='isometric-code-dot' />
              <span className='isometric-code-dot' />
              developer.ts
            </div>
            <div className='isometric-code' aria-label='Portfolio code snippet'>
              <span className='isometric-code-line' data-line='01'>
                <span>
                  const <span className='isometric-code-var'>developer</span> ={' '}
                  <span className='isometric-code-brace'>{'{'}</span>
                </span>
              </span>
              <span className='isometric-code-line' data-line='02'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>name</span>:{' '}
                  <span className='isometric-code-value'>{'"Denis"'}</span>,
                </span>
              </span>
              <span className='isometric-code-line' data-line='03'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>role</span>:{' '}
                  <span className='isometric-code-value'>
                    {'"Frontend Developer"'}
                  </span>
                  ,
                </span>
              </span>
              <span className='isometric-code-line' data-line='04'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>stack</span>:{' '}
                  <span className='isometric-code-array'>
                    {'["React", "Next.js", "TS"]'}
                  </span>
                  ,
                </span>
              </span>
              <span className='isometric-code-line' data-line='05'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>tools</span>:{' '}
                  <span className='isometric-code-array'>
                    {'["Redux", "Sass", "Figma"]'}
                  </span>
                  ,
                </span>
              </span>
              <span className='isometric-code-line' data-line='06'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>focus</span>:{' '}
                  <span className='isometric-code-value'>
                    {'"Clean UI & Motion"'}
                  </span>
                  ,
                </span>
              </span>
              <span className='isometric-code-line' data-line='07'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>experience</span>:{' '}
                  <span className='isometric-code-value'>{'"3+ years"'}</span>,
                </span>
              </span>
              <span className='isometric-code-line' data-line='08'>
                <span className='isometric-code-indent'>
                  <span className='isometric-code-key'>available</span>:{' '}
                  <span className='isometric-code-bool'>true</span>
                </span>
              </span>
              <span className='isometric-code-line' data-line='09'>
                <span className='isometric-code-brace'>{'}'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
